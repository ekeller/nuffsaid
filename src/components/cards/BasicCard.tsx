import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import s from './BasicCard.module.scss';

type BasicCardProps = {
  content: string;
  className?: string;
  onClick: () => void;
}

const BasicCard = ({ content, className = '', onClick }: BasicCardProps) => {
  return (
    <Card className={className}>
      <CardContent>
        <Typography>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className={s.clearButton} size="small" onClick={onClick}>Clear</Button>
      </CardActions>
    </Card>
  );
}

export default BasicCard
