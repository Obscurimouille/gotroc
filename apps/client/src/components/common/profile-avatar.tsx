import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { UserService } from 'src/services/user.service';
import { PersonIcon } from '@radix-ui/react-icons';
import { cn } from '@lib/utils';

const ProfileAvatar = ({ avatarUUID, className }: { avatarUUID?: string; className?: string }) => {
  return (
    <Avatar className={cn('w-32 h-32 border-1 border-neutral-200', className)}>
      {!!avatarUUID && (
        <AvatarImage src={UserService.getAvatarURL(avatarUUID)} className="object-cover" />
      )}
      <AvatarFallback className="bg-neutral-700">
        <PersonIcon color="white" />
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
