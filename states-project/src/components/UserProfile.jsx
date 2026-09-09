import { useState } from 'react' 

const UserProfile = () => {
    // Reacreación de estados en el componente
    /*const [user, setUser] = useState(null);
    
    const login = () => {
        setUser({name: "Chris", email: "chris@example.com"})
    };

    const logout = () => {
        setUser(null)
    };*/

    return (
        <div>
            { user ? (
                <div>
                    <p>Welcome {user.name} !</p>
                    <p>Email: {user.email}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ): (
                <div>
                    <p>Please log in</p>
                    <button onClick={login}>Login</button>
                </div>
            )}
        </div>
    )
}

export default UserProfile
