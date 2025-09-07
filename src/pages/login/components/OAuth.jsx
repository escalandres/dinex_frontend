
import GoogleAuth from './GoogleAuth';
import GitHubAuth from './GitHubAuth';
export const OAuth = () => {
    return (
        <div className="grid grid-cols-2 gap-x-3">
            <GoogleAuth oauthClass="oauth-button" />
            <GitHubAuth oauthClass="oauth-button" />
        </div>
    )
}