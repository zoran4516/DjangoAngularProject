export const ENDPOINTS = {
    COMPLETE_USER_PROFILE: "/api/complete/profile",
    COMPLETE_USER_SIGNUP: "/survey/api/signup/",
    USER_SIGNUP: "/accounts/signup/respondent",
    GET_DETAIL_BY_ID: "/survey/api/user/details/",
    UPDATE_RESPONDENT_PROFILE: "/survey/api/respondent_profile/",
    SURVEY_COST: "/survey/api/cost/",
    CREATE_SERVEY: "/survey/api/survey/",
    SAVE_QUESTION: "/survey/api/question_submit/",
    SAVE_TABS: "/survey/api/tabs_submit/",
    GET_USER_BY_ID: "/api/user_info",
    GET_CLIENT_SURVEY_BY_ID: "/survey/api/client_survey/",
    GET_QUESTION_DETAIL: "/survey/api/respondent/firstsurvey/",
    GET_SURVEY_QUOTE: "/survey/api/client/estimate/",
    QUESTION_DELETE: "/survey/api/question_submit/delete/",
    UPDATE_SURVEY_IMAGE: "/survey/api/update/survey/",
    GET_SURVEY_QUESTION_BY_ID: "/survey/api/survey/question/update/",
    DELETE_SURVEY_BY_ID: "/survey/api/delete/",
    PAY_SURVEY_BY_ID: "/survey/api/pay/",
    SAVE_FEEDBACK: "/accounts/clientFeedback/",

    // search respondent for assign survey by admin
    GET_ANSWER_FOR_ASSIGN_SURVEY_BY_ADMIN: "/survey/api/bind_ans_on_dropdown/",
    SEARCH_RESPONDENT: "/survey/api/search-respondent/",
    
    // assigned survey report
    GET_ASSIGNED_SURVEY_REPORT: "/survey/api/assigned-survey-report/",
}

export const REQUEST_HEADERS = {
    csrftoken: function () {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].split('=')[0].trim() == 'csrftoken') {
                return cookies[i].split('=')[1].trim();
            }
        }
    },
    headers: function () {
        return { 'X-CSRFToken': this.token }
    }
}