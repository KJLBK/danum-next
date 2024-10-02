import { getProfile } from '../../service/authService';
export default async function GetProfile() {
    try {
        return await getProfile();
    } catch (err) {}
}
