'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

import Link from 'next/link';

// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from 'html5-qrcode';

// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";

const Escanear = () => {

    const router = useRouter();

    const [currentCameraId, setCurrentCameraId] = useState('');
    const [devices, setDevices] = useState([]);
    const [menuShown, setMenuShown] = useState(true);
    const [qrCodeValue, setQrCodeValue] = useState('');

    useEffect(() => {
        if (currentCameraId) {
            handleStartScan(currentCameraId);
        }
    }, [currentCameraId]);

    function handleStartScan(idCamera) {
        console.log('idCamera', idCamera);
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            idCamera,
            {
                facingMode: "environment", // or user
                fps: 10,    // Optional, frame per seconds for qr code scanning
                qrbox: { width: 200, height: 200 }  // Optional, if you want bounded box UI
            },
            (decodedText, decodedResult) => {
                // do something when code is read
                console.log('decodedText', decodedText);
                setQrCodeValue(decodedText);
                setMenuShown(false);
                html5QrCode.stop().then((ignore) => {
                    // QR Code scanning is stopped.
                    console.log('ignore', ignore)
                    console.log('QR Code scanning is stopped.')
                    router.push(`/productos/${decodedText}`);
                }).catch((err) => {
                    // Stop failed, handle it.
                    console.log('err', err);
                });
            },
            (errorMessage) => {
                // parse error, ignore it.
            })
            .catch((err) => {
                // Start failed, handle it.
                console.log('err', err);
            });
    }

    useEffect(() => {
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                console.log('devices', devices);
                setDevices(devices);
                var cameraId = devices[0].id;
                setCurrentCameraId(cameraId);
            }
        }).catch(err => {
            // handle err
            console.log('err', err);
        });
    }, []);

    return (
        <div className="pt-24">

            {/* Regresar */}
            <Link
                href="/productos"
                type="button"
                className="inline-flex justify-center items-center text-gray-900 font-bold text-xl text-center rounded-lg p-2 mb-4 border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-600"
            >
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                Regresar
            </Link>

            {/* select menu */}
            {devices && devices.length > 0 && currentCameraId && menuShown && (
                <>
                    {/* <label for="devices-options" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Selecciona el dispositivo</label> */}
                    <select
                        id="devices-options"
                        onChange={(e) => {
                            setCurrentCameraId(e.target.value);
                        }}
                        value={currentCameraId}
                        class="bg-gray-200 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option selected>Selecciona el dispositivo</option>
                        {devices.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {/* camera */}
            <div id="reader" className='mt-2' style={{ width: '80vw' }}></div>

            {/* Qr Code value */}
            {qrCodeValue && (
                <div className='mt-2'>
                    <p className='text-lg' style={{ wordWrap: 'break-word', maxWidth: '80vw' }}>
                        ID: {qrCodeValue} <br />
                        Buscando...
                    </p>
                </div>
            )}

        </div>
    )
}

export default Escanear