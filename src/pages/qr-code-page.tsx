import QRScanner from '#/components/qr-code-scaner'
import { useCallback } from 'react'
const ScanQr = () => {

    const onScanSuccess = useCallback((decodedText: string) => {
        console.log(decodedText, 'decodedText') 
    }, [])

    const onScanError = useCallback((error: string) => {
        console.log(error, 'decodedText error')
    }, [])


    return (
        <div>
            <QRScanner
                qrCodeSuccessCallback={onScanSuccess}
                qrCodeErrorCallback={onScanError}
            />      
        </div>
    )
}

export default ScanQr;