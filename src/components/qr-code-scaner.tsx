import { Html5QrcodeScanner, type Html5QrcodeCameraScanConfig } from 'html5-qrcode';
import { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

interface ScannerConfig extends Partial<Html5QrcodeCameraScanConfig> {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
}

interface ScannerProps {
    fps?: number;
    qrbox?: number | { width: number; height: number };
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string) => void;
    qrCodeErrorCallback?: (error: string) => void;
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: ScannerConfig): Html5QrcodeCameraScanConfig => {
    const config: Html5QrcodeCameraScanConfig = {
        fps: 10,
        qrbox: { width: 250, height: 250 }
    };

    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin: React.FC<ScannerProps> = (props) => {


    // biome-ignore lint/correctness/useExhaustiveDependencies: there is no need to run this effect again
    useEffect(() => {
        // when component mounts
        const config = createConfig(props);
        const verbose = props.verbose === true;

        // Success callback is required.
        if (!(props.qrCodeSuccessCallback)) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, [props.qrCodeSuccessCallback, props.qrCodeErrorCallback, props.verbose]);

    return (
        <div id={qrcodeRegionId} />
    );
};

export default Html5QrcodePlugin;