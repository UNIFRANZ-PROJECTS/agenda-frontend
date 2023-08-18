import { Box, Typography } from '@mui/material';

import { ReactSVG } from 'react-svg';
import { SearchOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useCategorieStore } from '../../../hooks';


export const CategoriesCard = ({ category }) => {
    const { selectCategorie } = useCategorieStore();

    const { categorySelect = 'todos' } = useSelector((state) => state.events);
    const isSelected = categorySelect === category.id;
    const handleCategorySelect = (id) => {
        selectCategorie(id)
    };
    return (
        <Box
            onClick={() => handleCategorySelect(category.id)}
            className={`category-widget ${isSelected ? 'selected' : ''}`}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: `3px solid ${isSelected ? 'white' : 'black'}`,
                borderRadius: '16px',
                backgroundColor: isSelected ? 'white' : 'transparent',
                minWidth: '130px',
                height: '90px',
                aspectRatio: '1',
                margin: '5px',
                cursor: 'pointer',
            }}
        >
            <Box>
                {category.icon === 'todos' ? (
                    <SearchOutlined color="primary" />
                ) : (
                    <div
                        style={{
                            width: '35px',
                            height: '35px',
                        }}
                    >
                        <ReactSVG
                            src={category.icon}
                            beforeInjection={(svg) => {
                                svg.setAttribute('fill', isSelected ? '#F26522' : 'black');
                                svg.setAttribute('width', '100%');
                                svg.setAttribute('height', '100%');
                            }}
                        />
                    </div>
                )}
            </Box>
            <Typography
                // variant="body1"
                color={isSelected ? '#F26522' : 'black'}
                sx={{
                    marginTop: '6px',
                    wordWrap: 'break-word',
                    textAlign: 'center', // Agregar esta línea
                }}
            >
                {category.title}
            </Typography>
        </Box>
    )
}
