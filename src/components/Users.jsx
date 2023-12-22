import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { fetchUser } from '../features/userSlice';
import { NavLink } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch()

     const user = useSelector((state) => state.user.users)

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        <div>
            {user.map((item) => {
                return <div key={item._id}>{item.login}</div>
            })}
            <NavLink to={'/auth'}><button>Вернуться</button></NavLink>
        </div>
    );
};

export default Users;