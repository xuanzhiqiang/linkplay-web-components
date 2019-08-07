import React from "react";
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import _TextField from "@material-ui/core/TextField";
import _FormControl from "@material-ui/core/FormControl";

import { Strings } from "./config/Config";
import { withReviewComment } from "./BaseView/ReviewComment";
import { constProjectType, constVoiceServices } from "./config/Const";
import Utils from "./utils/Utils";

import pick from "lodash/pick";
import isEqual from "lodash/isEqual";

const TextField = withReviewComment(_TextField)
const FormControl = withReviewComment(_FormControl)

const styles = theme => ({
    main: {
        display: "flex",
        flexDirection: "column"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(5)
    },
    itemTextField: {

    }
});


const entries = Object.entries;
const Array_ProjectType = entries(constProjectType);
const Array_VoiceServices = entries(constVoiceServices);

const supportState = [
    'projectID',
    'projectType',
    'voiceService'
]

class BaseProjectInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projectType: Array_ProjectType[0][0],
            voiceService: Array_VoiceServices[0][0]
        }
    }

    componentDidMount() {
        this.props.Reference && this.props.Reference(this);
    }

    componentWillReceiveProps(nextProps) {
        const { initData } = nextProps;
        if (!isEqual(this.props.initData, initData)) {
            this._initData(initData);
        }
    }

    componentDidUpdate(preProps, prevState) {
        const preData = this._getDataByState(prevState);
        const data = this._getDataByState(this.state);
        if (!isEqual(preData, data)) {
            this.props.OnValueChange && this.props.OnValueChange(data);
        }

        const preReviewData = this.getReviewData(prevState);
        const ReviewData = this.getReviewData(this.state);
        if (!isEqual(preReviewData, ReviewData)) {
            this.props.OnReviewDataChange && this.props.OnReviewDataChange(ReviewData);
        }

        if (this._haveError(this.state) !== this._haveError(prevState)) {
            this.props.OnErrorChange && this.props.OnErrorChange(this._haveError(this.state));
        }
    }

    componentWillUnmount() {
        this.props.Reference && this.props.Reference(null);
    }

    _Snackbar = (variant, str) => {
        this.props.enqueueSnackbar(str, { variant, autoHideDuration: 3000 });
    }

    render() {
        const { ReviewEnable, disabled, ProjectTypes, VoiceServices } = this.props;
        const { classes } = this.props;
        return (
            <div className={classes.main}>

                {/* 项目基本信息 */}
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_TITLE_PROJECT_BASIC}
                </Typography>
                <div className={classes.row}>
                    <TextField
                        id="projectID"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.projectIDError}
                        helperText={this.state.projectIDHelper}
                        label={'Project ID'}
                        placeholder={Strings.AMAZON_PROJECT_HINT}
                        onChange={event => {
                            this.setState({ projectID: event.target.value }, () => {
                                const { projectID } = this.state;
                                const pal = /^[a-zA-Z0-9_-]*?$/;
                                if (projectID.length === 0) {
                                    this.setState({ projectIDError: true, projectIDHelper: Strings.PROJECT_NEW_REQUIRED });
                                }else if(!pal.test(projectID)){
                                    this.setState({
                                        projectIDError: true,
                                        projectIDHelper: Strings.AMAZON_PROJECT_NAME_INVALID,
                                    });
                                }else if (projectID.length < 3) {
                                    this.setState({
                                        projectIDError: true, projectIDHelper: Strings.AMAZON_PROJECT_NAME_TOO_SHORT
                                    });
                                } else if (projectID.length > 100) {
                                    this.setState({
                                        projectIDError: true, projectIDHelper: Strings.AMAZON_PROJECT_NAME_TOO_LONG
                                    });
                                } else {
                                    this.props.isDuplicate &&
                                        this.props.isDuplicate(projectID)
                                            .then()
                                            .catch();
                                }
                            });
                        }}
                        commentValue={this.state.projectIDComment}
                        onCommentError={error => {
                            this.setState({ projectIDComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <FormControl
                        id="projectType"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.projectTypeComment}
                        onCommentError={error => {
                            this.setState({ projectTypeComment: error });
                        }}
                        error={this.state.projectTypeError}>
                        <InputLabel htmlFor="projectType">{Strings.PROJECT_NEW_PRODUCT_LINE}</InputLabel>
                        <Select
                            value={this.state.projectType}
                            onChange={event => {
                                this.setState({ projectType: event.target.value });
                            }} >
                            {ProjectTypes.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.row}>
                    <FormControl
                        id="voiceService"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.voiceServiceComment}
                        onCommentError={error => {
                            this.setState({ voiceServiceComment: error });
                        }}
                        error={this.state.voiceServiceError}>
                        <InputLabel htmlFor="voiceService">{Strings.PROJECT_NEW_PRODUCT_LINE}</InputLabel>
                        <Select
                            value={this.state.voiceService}
                            onChange={event => {
                                this.setState({ voiceService: event.target.value });
                            }} >
                            {VoiceServices.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

            </div>
        )
    }

    _initData = (initData) => {
        let data = pick(initData, supportState)
        this.setState(data);
    }

    _getDataByState = (state) => {
        const {
            projectID = "",
            projectType = "",
            voiceService = ""
        } = state;
        return {
            projectID,
            projectType,
            voiceService
        };
    };

    _haveError = (state) => {
        return Utils.haveError(state);
    };

    getReviewData = (state) => {
        return Utils.getReviewData(state);
    };

}

BaseProjectInfo.propTypes = {
    Reference: PropTypes.func,
    OnValueChange: PropTypes.func,
    OnErrorChange: PropTypes.func,
    OnReviewDataChange: PropTypes.func,
    disabled: PropTypes.bool,
    ReviewEnable: PropTypes.bool,
    initData: PropTypes.object,
};

// 为属性指定默认值:
BaseProjectInfo.defaultProps = {
    disabled: false,
    ReviewEnable: false,
    initData: {},
    ProjectTypes: Array_ProjectType,
    VoiceServices: Array_VoiceServices,
};

export default withSnackbar(withStyles(styles)(BaseProjectInfo));