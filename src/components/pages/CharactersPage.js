import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { charactersSelector } from './../../reducers/characters';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

class CharactersPage extends Component {
   

     render(){
        const  {characters} = this.props;
        return (<div>
            {characters.length === 0 && ( 
                <div className="text-center">
            <div className="alert alert-info"><FormattedMessage
                                id="characters.empty.message"
                                defaultMessage="You have no characters yet. How about creating one?"
                            /></div>
            <Link to="/characters/new"  className="btn btn-primary btn-lg"><FormattedMessage
                                id="create.new.character"
                                defaultMessage="Create new character"
                            /></Link>
            </div>
            )}
                    </div>);
    }
}    
        



CharactersPage.propTypes = {
characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state){
    return {
        characters:charactersSelector(state)
    }
}

export default connect(mapStateToProps,null,null, {
    pure: false})(CharactersPage);