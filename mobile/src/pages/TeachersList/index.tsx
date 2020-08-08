import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import styles from './styles'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

function TeachersList() {

    const [isFilterVisible, setFilterVisible] = useState(false)

    const [subject, setSubject] = useState('')
    const [week_day, setWeekday] = useState('')
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoriteTeachers = JSON.parse(response)
                const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavorites(favoriteTeachersIds)
            }
        })
    }

    useEffect(() => {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoriteTeachers = JSON.parse(response)
                const favoriteTeachersId = favoriteTeachers.map((teacher: Teacher) => teacher.id)
                setFavorites(favoriteTeachersId)
            }
        })
    }, [])

    useFocusEffect(() => {
        loadFavorites()
    })

    function handleToggleFilterVisible() {
        setFilterVisible(!isFilterVisible)
    }

    async function handleFilterSubmit() {
        loadFavorites()
        
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setFilterVisible(false)
        setTeachers(response.data)

    }

    return (
        <View style={ styles.container }>
            <PageHeader 
                title='Proffys disponíveis'
                headerRight={(
                    <BorderlessButton onPress={ handleToggleFilterVisible }>
                        <Feather name='filter' size={20} color='#FFF'/>
                    </BorderlessButton>
                )}
            >
                { isFilterVisible && (
                
                    <View style={ styles.searchForm }>
                        <Text style={ styles.label }>Matéria</Text>
                        <TextInput 
                            style={ styles.input }
                            value={ subject }
                            onChangeText={ text => setSubject(text) }
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc'
                        />
                        <View style={ styles.inputGroup }>
                            <View style={ styles.inputBlock }>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={ week_day }
                                    onChangeText={text => setWeekday(text)}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc'
                                />

                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={ time }
                                    onChangeText={text => setTime(text)}
                                    placeholder='Qual horário?'
                                    placeholderTextColor='#c1bccc'
                                />

                            </View>
                        </View>

                        <RectButton 
                            style={ styles.submitButton }
                            onPress={ handleFilterSubmit }
                        >
                            <Text style={ styles.submitButtonText }>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={ styles.teacherList }
                contentContainerStyle={{ 
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={ teacher.id } 
                            teacher={ teacher }
                            favorite={favorites.includes(teacher.id)}
                        />
                    )
                    }
                )}
                
            </ScrollView>

        </View>
    )
}

export default TeachersList