import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDone from '@material-ui/icons/CloudDone';

import { Strings } from "../config/Config";

const styles = (theme) => ({
    root: {
        borderStyle: "dashed",
        borderWidth: 2,
        color: "gray",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
    },
    icon: {
        width: 90,
        height: 90
    },
    iconRoot: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
    },
    error: {
        color: 'red'
    },
    successText: {
        paddingLeft: 10,
        paddingRight: 10,
        wordBreak: "break-all",
        wordWrap: "break-word"
    }
});


class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }

    uploadFile = (file) => {
        let formData = new FormData();
        formData.append("file", file);

        this.props.onUploadFile && this.props.onUploadFile(formData);
    };

    onDropAccepted = (files, event) => {
        const temp = files[0];
        this.uploadFile(temp);
    };

    onDropRejected = (files, event) => {
        this.setState({ error: true });
        this.props.enqueueSnackbar(Strings.PROJECT_FILE_FORMAT_MISMATCH, {
            variant: "error",
            autoHideDuration: 3000,
        });
    };

    render() {
        const { classes, disabled, accept, zoneStyle = { width: 225, height: 225 }, error: propsError } = this.props;

        const { error } = this.state;

        return (
            <div>
                <Dropzone
                    accept={accept}
                    disabled={disabled}
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected} >

                    {({ getRootProps, getInputProps }) => (
                        <div
                            style={zoneStyle}
                            className={classNames(classes.root, error || propsError ? classes.error : '')}
                            {...getRootProps()}>

                            <input {...getInputProps()} />

                            {this._renderContent()}

                        </div>
                    )}

                </Dropzone>
            </div>
        );
    }

    _renderContent = () => {
        const { classes, url, fileName, helper, error: propsError, uploading } = this.props;
        const { error } = this.state;

        const successTip = fileName ? fileName : 'Success';
        const helperText = propsError ? helper : Strings.PROJECT_FILE_FORMAT_MISMATCH;
        if (error || propsError) {
            return (<p>{helperText}</p>)
        }

        if (uploading) {
            return (<CircularProgress className={classes.progress} />);
        }

        if (url) {
            return (
                <div className={classes.iconRoot}>
                    <CloudDone className={classes.icon} />
                    <p className={classes.successText} >{successTip}</p>
                </div>
            );
        }

        return (
            <div className={classes.iconRoot}>
                <CloudUpload className={classes.icon} />
                <p> Please upload</p>
            </div>
        );
    };

}

FileUpload.propTypes = {
    disabled: PropTypes.bool,
    onUploadFile: PropTypes.func,
    
    accept: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    uploading: PropTypes.bool.isRequired,
    helper: PropTypes.string.isRequired,
    zoneStyle: PropTypes.object,
};

// 为属性指定默认值:
FileUpload.defaultProps = {
    disabled: false
};

export default withSnackbar(withStyles(styles)(FileUpload));