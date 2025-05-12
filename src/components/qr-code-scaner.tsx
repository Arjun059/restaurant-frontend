import  {Scanner as QrScanner}  from '@yudiel/react-qr-scanner'

interface ScannerProps {
  qrCodeSuccessCallback: (decodedText: string) => void
  qrCodeErrorCallback?: (error: string) => void
}

const Html5QrcodePlugin: React.FC<ScannerProps> = (props) => {
  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-55px)] w-full max-w-sm items-center justify-center align-middle">
      <div className="min-h-[300px] min-w-[300px] rounded-lg align-middle text-card-foreground shadow-sm">
        <QrScanner
          onScan	={(result:any) => {props.qrCodeSuccessCallback(result)}}
          onError={(error: any) => props.qrCodeErrorCallback?.(error?.message || 'Unknown error')}
          constraints={{
            facingMode: 'environment'
          }}
          sound={false}
        />
      </div>
    </div>
  )
}

export default Html5QrcodePlugin
