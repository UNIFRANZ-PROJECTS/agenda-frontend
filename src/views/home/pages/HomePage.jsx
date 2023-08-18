import { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import './HomePage.css';

import homeImage01 from './../../../assets/images/home-01.webp';
import homeImage02 from './../../../assets/images/home-02.webp';
import homeImage03 from './../../../assets/images/home-03.webp';
import homeImage04 from './../../../assets/images/home-04.webp';

export const HomePage = () => {
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const cards = [
        {
            image: homeImage01,
            title: 'La Paz',
            url: 'lp',
        },
        {
            image: homeImage02,
            title: 'El Alto',
            url: 'ea',
        },
        {
            image: homeImage03,
            title: 'Cochabamba',
            url: 'cbba',
        },
        {
            image: homeImage04,
            title: 'Santa Cruz',
            url: 'sc',
        },
    ];
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: `${screenHeight - 100}px` }}>
            <Stack
                direction={screenWidth > 1000 ? 'row' : 'column'}
                spacing={2}
                sx={{ flex: 1, overflow: 'auto', padding: '10px' }}
            >
                {cards.map((card) => (
                    <CardMedia
                        onClick={() => navigate(`/${card.url}`)}
                        key={card.image}
                        className='card'
                        sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            opacity: 1,
                            transition: 'opacity 0.3s',
                            '&:hover': {
                                opacity: 0.8,
                            },
                        }}
                        image={card.image}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                color: 'white',
                                textAlign: 'center',
                                width: '100%',
                                textDecoration: 'none',
                            }}
                        >
                            {card.title}
                        </Typography>
                    </CardMedia>
                ))}
            </Stack>
        </div>
    );
};
