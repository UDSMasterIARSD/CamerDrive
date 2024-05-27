package com.example.backend.services;

import com.example.backend.dto.QuizRequest;
import com.example.backend.dto.QuizResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.Question;
import com.example.backend.models.Quiz;
import com.example.backend.repositories.QuestionRepository;
import com.example.backend.repositories.QuizRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepo;

    private QuestionRepository questionRepo;

    private ModelMapper mapper;

    @Override
    public List<QuizResponse> index() {
        Pageable pageable = Pageable.ofSize(15);
        return quizRepo.findAll(pageable).stream().map(el ->
                mapper.map(el, QuizResponse.class)).toList();
    }

    @Override
    public QuizResponse create(QuizRequest quiz){
        Quiz req = mapper.map(quiz, Quiz.class);
        System.out.println(req);
        List<Question> questions = new ArrayList<>(req.getQuestions());
        req.setQuestions(questions);
        return mapper.map(quizRepo.save(req), QuizResponse.class);
    }

    @Override
    public QuizResponse show(Long id){
        Quiz quiz = quizRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Quiz ", "d'id: ", id));
        return mapper.map(quiz, QuizResponse.class);
    }

    @Override
    public QuizResponse update(Long id, QuizRequest updatedQuiz){
        Quiz old = quizRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Quiz que vous voulez modifier ", "d'id: ", id));
        Quiz quiz = mapper.map(updatedQuiz, Quiz.class);
        quiz.setId(id);
        return mapper.map(quiz, QuizResponse.class);
    }

    @Override
    public void delete(Long id){
        Quiz quiz = quizRepo.findById(id).orElseThrow(() ->
                new NotFoundException("Le Quiz que vous voulez supprimer ", "d'id: ", id));
        quizRepo.delete(quiz);
    }

//    public List<Question> getQuizQuestById(Long id){
//        System.out.println("Id"+id);
//        List<QuizQuestion> quizQuestList = quizQuestionRepository.findByQuiz(getQuizById(id));
//        List<Question> questionList = new ArrayList<>();
//        for (QuizQuestion quizQues: quizQuestList){
//            Optional<Question> optionalQuestions = questionRepository.findById(quizQues.getQuestion().getId());
//            optionalQuestions.ifPresent(questionList::add);
//        }
//
//        questionList.forEach(q->System.out.println(q.getLibelle()));
//        return questionList;
//    }

}
