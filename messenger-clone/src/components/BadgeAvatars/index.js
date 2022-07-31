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

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
}));
export default function BadgeAvatars({
    avatar,
    badgeVisible,
    online,
    avatarClassName,
}) {

    const isArrayAvatar = avatar instanceof Array;

    return (
        <Stack direction="row" spacing={2}>
            {badgeVisible ? (
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                    onlineColor={online ? '#009933' : '#C0C0C0'}
                >
                    <Avatar alt="" src={avatar} className={avatarClassName} />
                </StyledBadge>
            ) : (
                <>
                    {isArrayAvatar ? (
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <SmallAvatar alt="" src={avatar[0]} />
                            }
                        >
                            <Avatar alt="" src={avatar[1]} />
                        </Badge>
                    ) : (
                        <Avatar alt="" src={avatar} />
                    )}
                </>
            )}
        </Stack>
    );
}

BadgeAvatars.propTypes = {
    className: PropTypes.string,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
    badgeVisible: PropTypes.bool,
    online: PropTypes.bool,
    avatarClassName: PropTypes.string,
    groupAvatarEnable: PropTypes.bool,
}

BadgeAvatars.defaultProps = {
    badgeVisible: true,
    online: false,
    avatarClassName: '',
    groupAvatarEnable: false,
}