export class SharedFeedback {
    allowSubmitForm: boolean = false;
    technicalEvalutionArray = [];
    checkSubmission = [];
    feedbackResponse = [];
    constructor() {

    }



    removeTechRow(completeData, currentData, index) {
        let dataIndex;
        for (let i = 0; i < completeData.length; i++) {
            if (!completeData[i].showRow && completeData[i].col2_response === '') {
                dataIndex = i - 1; // previous index for deletion
                break;
            } else {
                dataIndex = completeData.length - 1 // previous index for deletion if it exceeds total compleData length
            }
        }
        if (dataIndex > 0) {
            completeData[dataIndex].showRow = false;
            completeData[dataIndex].col2_response = '';
        }
    }

    checkValidityForAdd(completeData) {

        let dataIndex;
        for (let i = 0; i < completeData.length; i++) {
            if (!completeData[i].showRow && completeData[i].col2_response === '') {
                dataIndex = i;
                break;
            }
        }
        if (dataIndex) {
            return true;
        } else {
            return false;
        }
    }

    checkValidityForMinus(completeData) {
        let dataIndex;
        for (let i = 0; i < completeData.length; i++) {
            if (!completeData[i].showRow && completeData[i].col2_response === '') {
                dataIndex = i;
                break;
            }
        }
        if (dataIndex === 1) {
            return false;
        } else {
            return true;
        }
    }


    selectedTechnology(val, id) {
        if (id === 31 && id) {
            this.allowSubmitForm = false;
        }
    }


    commonFeedbackSubmit(feedbackCalendarId){
        this.checkSubmission = [];
        this.feedbackResponse = [];
        this.technicalEvalutionArray.forEach(tech => {
          tech.tableData.forEach(tData => {
            if (tData.col2_dynamic) {
              tData.col2_dynamic.forEach((tData1, index) => {
                if (index === 0) {
                  this.checkSubmission.push(tData1.col2_response.toString());
                  this.checkSubmission.push(tData1.col3_response.toString());
                  this.checkSubmission.push(tData1.col4_response.toString());
                }
                this.feedbackResponse.push({
                  "feedbackFormId": tData1.col2_formDetailId,
                  "feedbackResponse": tData1.col2_response.toString(),
                  "calendarId": feedbackCalendarId
                });
                this.feedbackResponse.push({
                  "feedbackFormId": tData1.col3_formDetailId,
                  "feedbackResponse": tData1.col3_response.toString(),
                  "calendarId": feedbackCalendarId
                });
                this.feedbackResponse.push({
                  "feedbackFormId": tData1.col4_formDetailId,
                  "feedbackResponse": tData1.col4_response,
                  "calendarId": feedbackCalendarId
                });
              });
            } else {
                this.feedbackResponse.push({
                "feedbackFormId": tData.col3_formDetailId,
                "feedbackResponse": tData.col3_response.toString(),
                "calendarId": feedbackCalendarId
              });
              this.feedbackResponse.push({
                "feedbackFormId": tData.col4_formDetailId,
                "feedbackResponse": tData.col4_response,
                "calendarId": feedbackCalendarId
              });
            }
          });
        });
    }
}