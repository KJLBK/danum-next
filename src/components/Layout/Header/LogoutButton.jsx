import { logout } from '../../../service/authService';
import { useAuthStore } from '../../../store/authStore';
import Button from '../../common/Button';

export function LogoutButton() {
    const { clearAuth } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout(clearAuth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Button onClick={handleLogout}>로그아웃</Button>
        </>
    );
}
