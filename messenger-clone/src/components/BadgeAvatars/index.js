import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';


const StyledBadge = styled(Badge)(({ theme, onlineColor }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: onlineColor,
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
    avatar,
    badgeVisible,
    online,
    avatarclassName,
}) {
    return (
        <Stack direction="row" spacing={2}>
            {badgeVisible ? (
                <>
                    {online ? (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            onlineColor='#009933'
                        >
                            <Avatar alt="" src={avatar} className={avatarclassName} />
                        </StyledBadge>
                    ) : (
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                            onlineColor='#C0C0C0'
                        >
                            <Avatar alt="" src={avatar} />
                        </StyledBadge>
                    )}
                </>
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
    online: PropTypes.bool,
    avatarclassName: PropTypes.string,
}

BadgeAvatars.defaultProps = {
    badgeVisible: true,
    online: false,
    avatarclassName: '',
}