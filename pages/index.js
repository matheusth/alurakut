import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakurtCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { requestFollowers, requestFollowing } from '../src/utils/APIRequests';
import { useEffect, useState } from 'react';

/*const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;*/

function ProfileSideBar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = 'matheusth';

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    requestFollowing(githubUser).then((result) => {
      setFollowing(result);
    });
    requestFollowers(githubUser).then((result) => {
      setFollowers(result);
    });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div style={{ gridArea: 'welcomeArea' }}>
          <Box>Bem vindo</Box>
        </div>
        <div style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({following.length})
            </h2>
            <ul>
              {following.map((user) => (
                <li key={user.login}>
                  <a href={user.url}>
                    <img src={user.avatar_url} />
                    <span>{user.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Github Followers</h2>
            <ul>
              {followers.map((user) => (
                <li key={user.login}>
                  <a href={user.url}>
                    <img src={user.avatar_url} />
                    <span>{user.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
