import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import styles from './styles'

import giveClassesBackground from '../../assets/images/give-classes-background.png'

function GiveClasses() {
    const { goBack} = useNavigation()

    function navigateBack() {
        goBack()
    }

    return (
        <View style={ styles.container }>
            <ImageBackground 
                source={ giveClassesBackground } 
                style={ styles.content }
                resizeMode='contain'
            >
                <Text style={ styles.title }>Quer ser um Proffy?</Text>
                <Text style={ styles.description }>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton style={ styles.okButton } onPress={ navigateBack }>
                <Text style={ styles.okButtonText }>Tudo bem</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses