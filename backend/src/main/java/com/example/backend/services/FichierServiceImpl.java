package com.example.backend.services;

import com.example.backend.dto.FichierResponse;
import com.example.backend.exceptions.BADException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Fichier;
import com.example.backend.repositories.FichierRepository;
import jakarta.xml.bind.DatatypeConverter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

@Service
public class FichierServiceImpl implements FichierService {

    @Autowired
    private FichierRepository fichierRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public Fichier show(Long id) {
        return fichierRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le fichier", "d'id: ", id));
    }

    @Override
    public ResponseEntity<Resource> download(Long id) {
        Fichier fichier = show(id);
        Path filePath = Paths.get(fichier.getUrl());
//        System.out.println("\nFilePath: " + filePath);
        try {
            Resource resource = new UrlResource(filePath.toUri());
//            System.out.println("\n\n Resource: " + resource);
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public FichierResponse upload(MultipartFile file, String path) {
        if (file.isEmpty())
            throw new BADException("Veillez selectionner une image");
        String nouveauNom = copyImgToPath(file, path);
//        String extension = getExtension(Objects.requireNonNull(file.getOriginalFilename()));
//        String nomHache = nouveauNom + "." + extension;
        Fichier fichier = new Fichier();
        fichier.setUrl(path + nouveauNom);
//        System.out.println(fichier);
        return mapper.map(fichierRepo.save(fichier), FichierResponse.class);
    }

    private String getExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }

    public static String copyImgToPath(MultipartFile image, String path) {
        File repertoire = new File(path);
        if (!repertoire.exists()) {
            boolean repertoireCree = repertoire.mkdirs();
            if (!repertoireCree) {
                throw new BADException("Impossible de créer le répertoire 'pictures'");
            }
        }
        if (image.isEmpty())
            throw new BADException("Veillez selectionner une image");

        String nomFichier = image.getOriginalFilename();
        String extension = FilenameUtils.getExtension(nomFichier);

        // Générer un nom de fichier unique et sécurisé
        byte[] imageBytes = null;
        try {
            imageBytes = image.getBytes();
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] hashBytes = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(imageBytes);
            hashBytes = md.digest();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        String hashString = DatatypeConverter.printHexBinary(hashBytes);

        // Ajouter un UUID pour garantir l'unicité
        String uniqueID = UUID.randomUUID().toString();
        String nouveauNom = hashString + "_" + uniqueID + "." + extension;

        File fichierDuServeur = new File(repertoire, nouveauNom);
        try {
            FileUtils.writeByteArrayToFile(fichierDuServeur, image.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return nouveauNom;
    }
}
