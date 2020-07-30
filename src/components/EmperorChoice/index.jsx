import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class EmperorChoice extends React.Component {
    render() {
        var card;

        if (this.props.infos.number > 0) {
            card = <div className="EmperorChoice">
                <Card className="Card" variant="outlined">
                    <CardContent>
                        <Typography className="CardTitle" variant="h5" component="h2">
                            {this.props.infos.name}
                        </Typography>
                        <Typography className="CardInfos" color="textSecondary">
                            {this.props.infos.type}
                        </Typography>
                        <Typography variant="body2" component="p">
                            <b>Type de modification :</b> {this.props.infos.modifier.title} <br />
                            <b>Option activée :</b> {this.props.infos.modifier.option} <br />
                        </Typography>
                        <Typography className="CardInfos" color="textSecondary">
                            Nombre : {this.props.infos.number}
                        </Typography>
                    </CardContent>
                </Card>
            </div>;
        }
        else {
            card = "";
        }

        return (
            <div>
                { card }
            </div>
        );
    }
}

export default EmperorChoice;