import React from 'react';
import Header from './Header.jsx';

import Model from 'model';

function App() {

    const imageUrl = 'https://replicate.delivery/pbxt/513Bp8913Z7AKtfOmUmNsfJiUT8p1cXY6zPxJ6eQ38ZwtpPiA/out-0.png';
    const title = "Generate Wonderful Art";
    const height = 512;
    const width = 512;

    return <Header imageUrl='no' websiteTitle={title} height={height} width={width} />

} //end App()

export default App;
