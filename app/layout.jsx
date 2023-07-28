import '@styles/globals.css';
import Nav from '@components/Nav';
import { SelectedProductsProvider } from '@components/SelectedProductsContext';

export const metadata = {
    title: 'La Galería del Dulce',
    description: 'La Galería del Dulce',
}

const RootLayout = ({ children }) => {
    return (
        <SelectedProductsProvider>
            <html lang='en'>
                <body>

                    {/* For background */}
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    {/* Main content */}
                    <main>

                        {/* Navbar */}
                        <Nav />

                        {/* Pages */}
                        <div className='app'>
                            {children}
                        </div>

                    </main>
                </body>

            </html>
        </SelectedProductsProvider>
    )
}

export default RootLayout