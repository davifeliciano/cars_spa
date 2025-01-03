import { Avatar, Card, CardHeader, Skeleton } from "@mui/material";
import Profile from "../models/Profile";

interface ProfileProps {
  profile: Profile | null;
}

export default function ProfileCard({ profile }: ProfileProps) {
  return (
    <Card>
      <CardHeader
        title={profile ? profile.nome : <Skeleton />}
        subheader={profile ? profile.cargo : <Skeleton />}
        avatar={
          profile ? (
            <Avatar alt={profile.nome} src={profile.avatar} />
          ) : (
            <Skeleton variant="circular" width={40} height={40} />
          )
        }
      />
    </Card>
  );
}
