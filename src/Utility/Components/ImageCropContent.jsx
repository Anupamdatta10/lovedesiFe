import React, { Component } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

class ImageCropContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { crop, croppedImageUrl, src, circularCrop } = this.props;
        return (
            <div className="modalinnerbody">
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        //ruleOfThirds
                        circularCrop={circularCrop}
                        onImageLoaded={this.props.onImageLoaded}
                        onComplete={this.props.onCropComplete}
                        onChange={this.props.onCropChange}
                    />
                )}
                {/*this.props.croppedImageUrl && (
                        <img alt="Crop" style={{ maxWidth: '100%' }} src={this.props.croppedImageUrl} />
                    )*/}
            </div>
        );
    }
}


ImageCropContent.defaultProps = {
    circularCrop: true
}

export default withTranslation()(ImageCropContent);
