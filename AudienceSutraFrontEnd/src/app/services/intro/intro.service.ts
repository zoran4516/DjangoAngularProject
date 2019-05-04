import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { ENDPOINTS, REQUEST_HEADERS } from '../api.endpoint.helpers';
import { CoreService } from '../core/core.service';


@Injectable()
export class IntroService extends CoreService {

  constructor(public http: Http) {
    super(http);
  }

  updateRespondentUser(user_id, formData) {
    return this.http.patch(ENDPOINTS.COMPLETE_USER_SIGNUP + user_id + '/', formData, this.options)
      .map((res: Response) => res.json());
  }

  addClientUser(formData) {
    return this.http.post(ENDPOINTS.USER_SIGNUP, formData, this.options)
      .map((res: Response) => res.json());
  }

  getDetailByUserId(user_id) {
    return this.http.get(ENDPOINTS.GET_DETAIL_BY_ID + user_id).map((res: Response) => res.json());
  }
  getQuestionDetail() {
    return this.http.get(ENDPOINTS.GET_QUESTION_DETAIL).map((res: Response) => res.json());
  }
  getSurveyQuote(surveyId) {
    return this.http.get(ENDPOINTS.GET_SURVEY_QUOTE + surveyId).map((res: Response) => res.json());
  }

  updateRespondentProfile(formData) {
    ;
    return this.http.post(ENDPOINTS.UPDATE_RESPONDENT_PROFILE, formData, this.options)
      .map((res: Response) => res.json());
  }
  getSurveyCost(formData) {
    ;
    return this.http.post(ENDPOINTS.SURVEY_COST, formData, this.options)
      .map((res: Response) => res.json());
  }

  // ==========================================
  createSurvey(formData) {
    return this.http.post(ENDPOINTS.CREATE_SERVEY, formData, this.options)
      .map((res: Response) => res.json());
  }

  submitQuestion(formData) {
    console.log(ENDPOINTS.SAVE_QUESTION);
    return this.http.post(ENDPOINTS.SAVE_QUESTION, formData, this.options)
      .map((res: Response) => res.json());
  }

  surveyTabs(formData) {
    return this.http.post(ENDPOINTS.SAVE_TABS, formData, this.options)
      .map((res: Response) => {
        res.json()
      });
  }
  // ==========================================

  getLogedInUserData() {
    return this.http.get(ENDPOINTS.GET_USER_BY_ID).map((res: Response) => res.json());
  }

  getClientSurvey(userId) {
    return this.http.get(ENDPOINTS.GET_CLIENT_SURVEY_BY_ID + userId + '/').map((res: Response) => res.json());
  }

  deleteQuestion(questionId) {
    return this.http.get(ENDPOINTS.QUESTION_DELETE + questionId + '/').map((res: Response) => res.json());
  }

  saveSurveyImage(formData) {
    return this.http.patch(ENDPOINTS.UPDATE_SURVEY_IMAGE, formData, this.options)
      .map((res: Response) => res.json());
  }

  getSurveyQuestion(surveyId) {
    return this.http.get(ENDPOINTS.GET_SURVEY_QUESTION_BY_ID + surveyId + '/').map((res: Response) => res.json());
  }

  searchRespondent(surveyId) {
    return this.http.get(ENDPOINTS.GET_SURVEY_QUESTION_BY_ID + surveyId + '/').map((res: Response) => res.json());
  }

  deleteSurvey(surveyId) {
    // return this.http.get(ENDPOINTS.DELETE_SURVEY_BY_ID, surveyId).map((res: Response) => res.json());
    return this.http.get(ENDPOINTS.DELETE_SURVEY_BY_ID + surveyId + '/').map((res: Response) => res.json());
  }
  paySurvey(surveyId) {
    // return this.http.get(ENDPOINTS.DELETE_SURVEY_BY_ID, surveyId).map((res: Response) => res.json());
    return this.http.get(ENDPOINTS.PAY_SURVEY_BY_ID + surveyId + '/').map((res: Response) => res.json());
  }

  submitFeedback(formData) {
    return this.http.post(ENDPOINTS.SAVE_FEEDBACK, formData, this.options)
      .map((res: Response) => res.json());
  }

  // search respondent for assign survey by admin
  getAnswerBasedList() {
    return this.http.get(ENDPOINTS.GET_ANSWER_FOR_ASSIGN_SURVEY_BY_ADMIN).map((res: Response) => res.json());
  }

  SearchRespondentForAssignSurvey(searchData) {
    return this.http.post(ENDPOINTS.SEARCH_RESPONDENT, searchData, this.options)
      .map((res: Response) => res.json());
  }

  // get assigned survey report
  getAssignedSurveyReport() {
    return this.http.get(ENDPOINTS.GET_ASSIGNED_SURVEY_REPORT).map((res: Response) => res.json());
  }
}
