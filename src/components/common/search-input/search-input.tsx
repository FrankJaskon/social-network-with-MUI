import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, InputBaseProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { RootStateType } from '../../../redux/redux-store';
import { useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.black, 0.15),
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
        // backgroundColor: theme.palette.background.paper, 0.85),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

interface SearchInputProps extends InputBaseProps {
    placeholder: string
    onSubmit: (value: any) => void
    StyledComponent: any
}

const SearchInput = ({ placeholder, onSubmit, StyledComponent, ...rest }: SearchInputProps) => {

    // const { isLightTheme } = useSelector((state: RootStateType) => state.app);

    const [searchFieldValue, setSearchFieldValue] = React.useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchFieldValue(event.target.value);
    };

    // const clearField = (event: any) => {
    //     setSearchFieldValue('');
    // }

    const sendSearchValue = (event: any) => {
        if (event.key === 'Enter') {
            onSubmit(event);
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon color='primary'/>
            </SearchIconWrapper>
            <StyledComponent
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleSearchChange}
                value={searchFieldValue}
                onKeyDown={sendSearchValue}
                // onBlur={clearField}
                {...rest}
            />
        </Search>
    )
}

export default SearchInput;