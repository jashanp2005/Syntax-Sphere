import React, { useEffect } from 'react'
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Freebook from '../components/Freebook';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
    const {userstate} = useSelector((state) => state.user);
    useEffect(() => {
        console.log(userstate);
    }, [])
    
    return (
        <>
            <Navbar />
            <Banner />
            <Freebook />
            <Footer />
        </>
    )
}

export default Home
