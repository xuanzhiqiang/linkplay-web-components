import React from "react";
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import _TextField from "@material-ui/core/TextField";

import { Strings } from "./config/Config";
import { withReviewComment } from "./BaseView/ReviewComment";
import Utils from "./utils/Utils";

import pick from "lodash/pick";
import isEqual from "lodash/isEqual";

const TextField = withReviewComment(_TextField)

const styles = theme => ({
    main: {
        display: "flex",
        flexDirection: "column"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(1),
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

    },
    rowLink: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(2),
    },
    platformLinkButton: {
        display: "flex",
        marginLeft: theme.spacing(2),
    },
});


const supportState = [
    'profileID',
    'profileName',
    'clientID',
    'clientSecret',
    'productID',
    'avsAccount',
    'productName',
    'amazonID',
    'betaProductID',
    'betaProductName',
    'betaAmazonID',
    'iOSAPIKey',
    'iOSBundleID',
    'androidAPIKey',
    'androidPackage',
]

class VoiceServiceInfoAVS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
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

    RenderRowLink = (text, url = { "zh-CN": '', default: '' }, linkText) => {
        const { classes } = this.props;
        return (
            <div className={classes.rowLink}>
                <p>{text}</p>
                <div>
                    <Link
                        component="button"
                        variant="body1"
                        className={classes.platformLinkButton}
                        onClick={() => {
                            if (this.language === "zh-CN") {
                                window.open(url["zh-CN"], "_blank");
                            } else {
                                window.open(url["default"], "_blank");
                            }
                        }}>
                        {linkText}
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.main}>

                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_NEW_AVS_TITLE}
                </Typography>

                {this._AVSInfo()}

                {this._apiKeyView()}

            </div>
        )
    }

    _AVSInfo = () => {
        const { classes, ReviewEnable, disabled, hasSecurityProfile } = this.props;
        return (
            <div className={classes.content}>

                {!hasSecurityProfile && this._SecurityProfileView()}

                {
                    this.RenderRowLink(
                        'Modify User Permissions',
                        { "zh-CN": "/support/page/44500853", default: "/support/page/44500935" },
                        Strings.PROJECT_NEW_VIEW_HELP_DOC)
                }
                {
                    this.RenderRowLink('Official Product',
                        {
                            "zh-CN": `/support/page/39166974/{"SECURITY_PROFILE_NAME":"${this.state.profileName}"}`,
                            default: `/support/page/39166974/{"SECURITY_PROFILE_NAME":"${this.state.profileName}"}`
                        }
                        , Strings.PROJECT_NEW_VIEW_HELP_DOC)
                }

                <div className={classes.row}>
                    <TextField
                        id="avsAccount"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.avsAccountError}
                        helperText={this.state.avsAccountHelper}
                        label="AVS Account"
                        onChange={event => {
                            this.setState({ avsAccount: event.target.value }, () => {
                                const { avsAccount } = this.state;

                            });
                        }}
                        commentValue={this.state.avsAccountComment}
                        onCommentError={error => {
                            this.setState({ avsAccountComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        id="productName"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.productNameError}
                        helperText={this.state.productNameHelper}
                        label="Product Name"
                        onChange={event => {
                            this.setState({ productName: event.target.value }, () => {
                                const { productName } = this.state;

                            });
                        }}
                        commentValue={this.state.productNameComment}
                        onCommentError={error => {
                            this.setState({ productNameComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        id="productID"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.productIDError}
                        helperText={this.state.productIDHelper}
                        label="Product ID"
                        onChange={event => {
                            this.setState({ productID: event.target.value }, () => {
                                const { productID } = this.state;

                            });
                        }}
                        commentValue={this.state.productIDComment}
                        onCommentError={error => {
                            this.setState({ productIDComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        id="amazonID"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.amazonIDError}
                        helperText={this.state.amazonIDHelper}
                        label="Amazon ID"
                        onChange={event => {
                            this.setState({ amazonID: event.target.value }, () => {
                                const { amazonID } = this.state;

                            });
                        }}
                        commentValue={this.state.amazonIDComment}
                        onCommentError={error => {
                            this.setState({ amazonIDComment: error });
                        }}
                    />
                </div>


                {
                    this.RenderRowLink('Beta Product',
                        {
                            "zh-CN": `/support/page/39166980/{"SECURITY_PROFILE_NAME":"${this.state.profileName}"}`,
                            default: `/support/page/39166980/{"SECURITY_PROFILE_NAME":"${this.state.profileName}"}`
                        }
                        , Strings.PROJECT_NEW_VIEW_HELP_DOC)
                }


                <div className={classes.row}>
                    <TextField
                        id="betaProductName"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.betaProductNameError}
                        helperText={this.state.betaProductNameHelper}
                        label="Product Name"
                        onChange={event => {
                            this.setState({ betaProductName: event.target.value }, () => {
                                const { betaProductName } = this.state;

                            });
                        }}
                        commentValue={this.state.betaProductNameComment}
                        onCommentError={error => {
                            this.setState({ betaProductNameComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="betaProductID"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.betaProductIDError}
                        helperText={this.state.betaProductIDHelper}
                        label="Product ID"
                        onChange={event => {
                            this.setState({ betaProductID: event.target.value }, () => {
                                const { betaProductID } = this.state;

                            });
                        }}
                        commentValue={this.state.betaProductIDComment}
                        onCommentError={error => {
                            this.setState({ betaProductIDComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="betaAmazonID"
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        error={this.state.betaAmazonIDError}
                        helperText={this.state.betaAmazonIDHelper}
                        label="Amazon ID"
                        onChange={event => {
                            this.setState({ betaAmazonID: event.target.value }, () => {
                                const { betaAmazonID } = this.state;

                            });
                        }}
                        commentValue={this.state.betaAmazonIDComment}
                        onCommentError={error => {
                            this.setState({ betaAmazonIDComment: error });
                        }}
                    />
                </div>

            </div>
        );
    };

    _SecurityProfileView = () => {
        const { classes, ReviewEnable, disabled } = this.props;
        return (
            <div className={classes.content}>
                {
                    this.RenderRowLink(
                        'Company Name AVS Security Profile',
                        { "zh-CN": "/support/page/39166966", default: "/support/page/39166966" },
                        Strings.PROJECT_NEW_VIEW_HELP_DOC)
                }

                <div className={classes.row}>
                    <TextField
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        id="profileName"
                        label="Security Proflie Name"
                        value={this.state.profileName}
                        error={this.state.profileNameError}
                        helperText={this.state.profileNameHelper}
                        onChange={event => {
                            this.setState({
                                profileName: event.target.value,
                                profileNameError: false,
                                profileNameHelper: "",
                            });
                        }}
                        commentValue={this.state.profileNameComment}
                        onCommentError={error => {
                            this.setState({ profileNameComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        id="profileID"
                        label="Security Proflie ID"
                        value={this.state.profileID}
                        error={this.state.profileIDError}
                        helperText={this.state.profileIDHelper}
                        onChange={event => {
                            this.setState({
                                profileID: event.target.value,
                                profileIDError: false,
                                profileIDHelper: "",
                            });
                        }}
                        commentValue={this.state.profileIDComment}
                        onCommentError={error => {
                            this.setState({ profileIDComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        id="clientID"
                        label="Client ID"
                        value={this.state.clientID}
                        error={this.state.clientIDError}
                        helperText={this.state.clientIDHelper}
                        onChange={event => {
                            this.setState({
                                clientID: event.target.value,
                                clientIDError: false,
                                clientIDHelper: "",
                            });
                        }}
                        commentValue={this.state.clientIDComment}
                        onCommentError={error => {
                            this.setState({ clientIDComment: error });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        id="clientSecret"
                        label="Client Secret"
                        value={this.state.clientSecret}
                        error={this.state.clientSecretError}
                        helperText={this.state.clientSecretHelper}
                        onChange={event => {
                            this.setState({
                                clientSecret: event.target.value,
                                clientSecretError: false,
                                clientSecretHelper: "",
                            });
                        }}
                        commentValue={this.state.clientSecretComment}
                        onCommentError={error => {
                            this.setState({ clientSecretComment: error });
                        }}
                    />
                </div>
            </div>
        );
    };

    _apiKeyView = () => {
        const { classes, ReviewEnable, disabled } = this.props;
        return (
            <div className={classes.content}>
                {
                    this.RenderRowLink(
                        'API Key',
                        {
                            "zh-CN": `/support/page/39166986/{"PROFILE_ID": "${
                                this.state.profileID
                                }", "SECURITY_PROFILE_NAME":"${this.state.profileName}", "BUNDLE_ID_HOLDER": "${
                                this.state.iOSBundleID
                                }", "MD5_HOLDER": "${this.state.keystore_md5}", "SHA256_HOLDER": "${
                                this.state.keystore_sha256
                                }"}`,
                            default: `/support/page/39166986/{"PROFILE_ID": "${
                                this.state.profileID
                                }", "SECURITY_PROFILE_NAME":"${this.state.profileName}", "BUNDLE_ID_HOLDER": "${
                                this.state.iOSBundleID
                                }", "MD5_HOLDER": "${this.state.keystore_md5}", "SHA256_HOLDER": "${
                                this.state.keystore_sha256
                                }"}`
                        },
                        Strings.PROJECT_NEW_VIEW_HELP_DOC)
                }

                <div className={classes.row}>
                    <TextField
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        multiline
                        id="iOSAPIKey"
                        label="iOS API Key"
                        value={this.state.iOSAPIKey}
                        error={this.state.iOSAPIKeyError}
                        helperText={this.state.iOSAPIKeyHelper}
                        onChange={event => {
                            this.setState({
                                iOSAPIKey: event.target.value,
                                iOSAPIKeyError: false,
                                iOSAPIKeyHelper: "",
                            });
                        }}
                    />
                </div>

                <div className={classes.row}>
                    <TextField
                        className={classes.itemTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        multiline={true}
                        id="androidAPIKey"
                        label="Android API Key"
                        value={this.state.androidAPIKey}
                        error={this.state.androidAPIKeyError}
                        helperText={this.state.androidAPIKeyHelper}
                        onChange={event => {
                            this.setState({
                                androidAPIKey: event.target.value,
                                androidAPIKeyError: false,
                                androidAPIKeyHelper: "",
                            });
                        }}
                    />
                </div>
            </div>
        );
    };

    _initData = (initData) => {
        let data = pick(initData, supportState)
        this.setState(data);
    }

    _getDataByState = (state) => {
        const {
            profileID = '',
            profileName = '',
            clientID = '',
            clientSecret = '',
            productID = '',
            avsAccount = '',
            productName = '',
            amazonID = '',
            betaProductID = '',
            betaProductName = '',
            betaAmazonID = '',
            iOSAPIKey = '',
            iOSBundleID = '',
            androidAPIKey = '',
            androidPackage = '',
        } = state;
        return {
            profileID,
            profileName,
            clientID,
            clientSecret,
            productID,
            avsAccount,
            productName,
            amazonID,
            betaProductID,
            betaProductName,
            betaAmazonID,
            iOSAPIKey,
            iOSBundleID,
            androidAPIKey,
            androidPackage,
        };
    };

    _haveError = (state) => {
        return Utils.haveError(state);
    };

    getReviewData = (state) => {
        return Utils.getReviewData(state);
    };

}

VoiceServiceInfoAVS.propTypes = {
    Reference: PropTypes.func,
    OnValueChange: PropTypes.func,
    OnErrorChange: PropTypes.func,
    OnReviewDataChange: PropTypes.func,
    disabled: PropTypes.bool,
    ReviewEnable: PropTypes.bool,
    initData: PropTypes.object,
    hasSecurityProfile: PropTypes.bool.isRequired,
};

// 为属性指定默认值:
VoiceServiceInfoAVS.defaultProps = {
    disabled: false,
    ReviewEnable: false,
    hasSecurityProfile: false,
    initData: {},
};

export default withSnackbar(withStyles(styles)(VoiceServiceInfoAVS));