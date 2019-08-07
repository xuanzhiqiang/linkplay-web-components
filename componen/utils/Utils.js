import compact from "lodash/compact";

function haveError(state) {
    const Errors = [];
    for (const key of Object.keys(state)) {
        if (key.endsWith('Error')) {
            Errors.push(state[key]);
        }
    }
    return compact(Errors).length > 0;
};

function getReviewData(state) {
    const ReviewData = {};
    for (const key of Object.keys(state)) {
        if (key.endsWith('Comment')) {
            ReviewData[key] = state[key];
        }
    }
    return ReviewData;
};

export default {
    haveError,
    getReviewData,
}