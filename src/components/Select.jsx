import { Button, Chip } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useSelectorStore } from '../hooks';

export const ComponentSelect = React.memo(({ items = [], title, onPressed, labelChip, select = 'id' }) => {
    const { deselectOne } = useSelectorStore();
    const { selection = [] } = useSelector((state) => state.selections);

    const generateLabel = (data) => {
        return labelChip.map((key) => data[key]).join('-');
    };
    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                onClick={onPressed}
                style={{
                    width: '100%',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    color: 'grey',
                    textTransform: 'none',
                    fontSize: '1.1rem'
                }}
                classes={{
                    focused: {
                        borderColor: '#F26522',
                        borderWidth: '2px',
                    },
                    label: {
                        color: 'grey',
                    },
                }}
            >
                {title}
            </Button>
            {
                items.length > 0 ?
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                        {[...items.filter(e => selection.includes(e[select]))].map((data) => {
                            return (
                                <Chip
                                    key={data.id}
                                    color="primary"
                                    label={generateLabel(data)}
                                    style={{ margin: '1px' }}
                                    onDelete={() => {
                                        deselectOne(data[select])
                                    }}
                                />
                            );
                        })}
                    </div>
                    : <></>
            }
        </>
    )
})
