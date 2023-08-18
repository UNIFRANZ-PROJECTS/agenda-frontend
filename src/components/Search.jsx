import { SearchOutlined } from '@mui/icons-material';
import { InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const ComponentSearch = ({ title }) => (
    <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder={title}
        startAdornment={(
            <InputAdornment position="start">
                <SvgIcon
                    color="action"
                    fontSize="small"
                >
                    <SearchOutlined />
                </SvgIcon>
            </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
    />
);
