import { Html5QrcodeScanner, type Html5QrcodeCameraScanConfig } from 'html5-qrcode'
import { useEffect } from 'react'

const qrcodeRegionId = 'html5qr-code-full-region'

interface ScannerConfig extends Partial<Html5QrcodeCameraScanConfig> {
  fps?: number
  qrbox?: number | { width: number; height: number }
  aspectRatio?: number
  disableFlip?: boolean
}

interface ScannerProps {
  fps?: number
  qrbox?: number | { width: number; height: number }
  aspectRatio?: number
  disableFlip?: boolean
  verbose?: boolean
  qrCodeSuccessCallback: (decodedText: string) => void
  qrCodeErrorCallback?: (error: string) => void
}

const createConfig = (props: ScannerConfig): Html5QrcodeCameraScanConfig => {
  const config: Html5QrcodeCameraScanConfig = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
  }

  if (props.fps) config.fps = props.fps
  if (props.qrbox) config.qrbox = props.qrbox
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip

  return config
}

const Html5QrcodePlugin: React.FC<ScannerProps> = (props) => {

  useEffect(() => {
    if (!props.qrCodeSuccessCallback) {
      throw 'qrCodeSuccessCallback is required callback.'
    }

    const config = createConfig(props)
    const verbose = props.verbose === true

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)

    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback)

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    }
  }, [props])

  return (
    <div className="mx-auto flex h-full min-h-[calc(100vh-55px)] w-full max-w-sm items-center justify-center align-middle">
      <div className="min-h-[300px] min-w-[300px] rounded-lg align-middle text-card-foreground shadow-sm">
        <div id={qrcodeRegionId} className="relative aspect-square w-full">
          {/* Scanner will be injected here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 animate-pulse rounded-lg border-4 border-primary/50" />
          </div>
        </div>
      </div>

      <style>{`
        #${qrcodeRegionId} {
          position: relative;
          width: 100%;
          min-height: 300px;
          background: transparent !important;
        }
        
        #${qrcodeRegionId} > section {
          position: relative !important;
          border: none !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 0.5rem !important;
        }

        #${qrcodeRegionId} #html5-qrcode-anchor-scan-type-change {
          border: 1px solid hsl(var(--input)) !important;
          background-color: hsl(var(--background)) !important;
          color: hsl(var(--foreground)) !important;
          border-radius: calc(var(--radius) - 2px) !important;
          font-size: 0.875rem !important;
          line-height: 1 !important;
          margin: 0.25rem !important;
          text-decoration: none !important;
          margin-top: 1rem !important;
        }
        
        #${qrcodeRegionId} #html5-qrcode-button-file-selection {
         background-color: hsl(var(--background)) !important;
         color: hsl(var(--foreground)) !important;
         border: 1px solid hsl(var(--input)) !important;
         border-radius: calc(var(--radius) - 2px) !important;
         font-size: 0.875rem !important;
         line-height: 1 !important;
         margin: 0.25rem !important;

        }
     
        #${qrcodeRegionId} > section > div:first-child {
          position: relative !important;
          width: 100% !important;
          height: auto !important;
          padding-bottom: 100% !important;
        }
        
        #${qrcodeRegionId} video {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: 0.5rem !important;
        }
        
        #${qrcodeRegionId} .html5-qrcode-element {
          all: unset;
          height: 2.5rem;
          padding: 0 1rem;
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-radius: calc(var(--radius) - 2px);
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          cursor: pointer;
          transition: background-color 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0.25rem !important;
        }
        
        #${qrcodeRegionId} .html5-qrcode-element:hover {
          background-color: hsl(var(--primary) / 0.9) !important;
        }
        
        #${qrcodeRegionId} .html5-qrcode-element:disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }
        
        #${qrcodeRegionId} select {
          all: unset;
          height: 2.5rem;
          padding: 0 1rem;
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          border: 1px solid hsl(var(--input));
          border-radius: calc(var(--radius) - 2px);
          font-size: 0.875rem;
          line-height: 1;
          margin: 0.25rem !important;
        }
        
        #${qrcodeRegionId} .html5-qrcode-scanner-header {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 0.5rem !important;
          padding: 0.5rem !important;
        }
        
        #${qrcodeRegionId} .qr-box {
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 70% !important;
          height: 70% !important;
          border: 2px solid hsl(var(--primary) / 0.5) !important;
          border-radius: calc(var(--radius) - 2px) !important;
          box-shadow: 0 0 0 1000px hsl(var(--background) / 0.7) !important;
          pointer-events: none !important;
        }
        
        @media (max-width: 640px) {
          #${qrcodeRegionId} {
            min-height: 250px;
          }
          
          #${qrcodeRegionId} > section {
            gap: 0.25rem !important;
          }
          
          #${qrcodeRegionId} .html5-qrcode-element,
          #${qrcodeRegionId} select {
            height: 2.25rem;
            padding: 0 0.75rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Html5QrcodePlugin
