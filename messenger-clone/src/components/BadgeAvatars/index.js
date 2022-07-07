import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
export default function BadgeAvatars({
    className,
    avatar,
    badgeVisible,
}) {
    return (
        <Stack direction="row" spacing={2}>
            {badgeVisible ? (
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    className={className}
                >
                    <Avatar alt="" src={avatar} />
                </StyledBadge>
            ) : (
                <Avatar alt="" src={avatar} />
            )}
        </Stack>
    );
}

BadgeAvatars.propTypes = {
    className: PropTypes.string,
    avatar: PropTypes.string.isRequired,
    badgeVisible: PropTypes.bool,
}

BadgeAvatars.defaultProps = {
    className: '',
    badgeVisible: true,
}