import { cn } from '@lib/utils';
import { Button } from '@components/ui/button';
import { Link } from 'react-router-dom';
import SearchBar from './searchbar';

function Header({ className, ...props }: { className?: string }) {
  return (
    <header
      className={cn(className, 'w-full border-b-1 border-foreground/25 bg-background flex justify-center px-4')}
    >
      <div className="w-full lg:w-[1100px] py-3 flex justify-between items-center gap-6">
        <div className="flex-1 flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-foreground">GoTroc</Link>

          <SearchBar className="flex-1 lg:max-w-[400px]" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="link" size="sm" asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
          <Button variant="default" size="sm" className="hidden md:block">
            <Link to="/create">Déposer une annonce</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
