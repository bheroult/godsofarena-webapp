import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class EmperorChoice extends React.Component {
    render() {
        return (
            <div className="EmperorChoice">
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
                            <b>Option sélectionnée :</b> {this.props.infos.modifier.option}
                        </Typography>
                    </CardContent>
                </Card>

                {/*<h3>{this.props.infos.name}</h3>
                <ul>
                    <li><b>Type de gladiateur :</b> {this.props.infos.type}</li>
                    <li><b>Modifier :</b>
                        <ul>
                            <li><b>Type de modification :</b> {this.props.infos.modifier.title}</li>
                            <li><b>Option sélectionnée :</b> {this.props.infos.modifier.option}</li>
                        </ul>
                    </li>
        </ul>*/}
            </div>
        );
    }
}

export default EmperorChoice;