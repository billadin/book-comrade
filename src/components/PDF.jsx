import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const PDF = (book) => {

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 10
    },
    section: {
        padding: 10,
        // flexGrow: 1
    }
    });


  return (
    <>
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{textAlign: 'center', marginBottom: 20}}>{book?.book?.name}</Text>
      </View>
      <View style={styles.section}>
        <Text>{book?.book?.description1}</Text>
      </View>
      <View style={styles.section}>
        <Text>{book?.book?.description2}</Text>
      </View>
      <View style={styles.section}>
        <Text>{book?.book?.description1}</Text>
      </View>
      <View style={styles.section}>
        <Text>{book?.book?.description2}</Text>
      </View>
    </Page>
    </Document>
    </>
  )
}

export default PDF