import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import NamedStyles = StyleSheet.NamedStyles;

export default function TAncC (): React.ReactNode {
  return (
    <ScrollView contentContainerStyle={{gap: 30}}>
      <View style={styles.view}>
        <Text className={'text-xl'}>
          Sumar Termeni, Condiții și Politici de Securitate
        </Text>
        <Text>
          Probabil că nu ați avut răbdare să citiți Politica noastră de confidențialitate, așa că iată esențialul:
        </Text>
      </View>
      
      <View style={styles.view}>
        <Text className={"text-2xl"} style={{textAlign: 'center', fontWeight: 'bold'}}>
          NOTIFICARE PRIVIND CONFIDENȚIALITATEA
        </Text>
        <Text className={'text-xl'} style={{fontWeight: 'bold', textAlign: 'center'}}>
          Platformei VOXi și a aplicației mobile VOXiKids
        </Text>
      </View>
      
      <View className='border-b'/>
      
      <View style={styles.view}>
        <Text className={'text-xl'}>
          CINE SUNTEM?
        </Text>
        <Text>
          Noi, SPEAKQUEST SRL am dezvoltat VOXiKids - Easy Speech, un produs complex, care potențează intelectul copiilor. Aplicația VOXiKids este o sursă de exerciții interactive care poate fi folosită atât de logopezi ca suport pentru ședințele de terapie, cât și de părinții care doresc să-și ajute copii să exerseze acasă. Platforma VOXi este o clinică digitală prin intermediul căreia ai acces la un logoped oriunde te-ai afla! Iar ca logoped – aceasta este biroul tau virtual cu tot ce ai nevoie.
        </Text>
      </View>
      
      <View className='border-b'/>
      
      <View style={styles.view}>
        <Text className={'text-xl'}>
          DE CE AVEM NEVOIE DE DATELE TALE ȘI CUM LE UTILIZĂM?
        </Text>
        <Text className={"text-lg"}>
          Fără datele tale, soluțiile noastre nu ar putea funcționa! Astfel, folosim datele tale în următoarele scopuri:
        </Text>
        <Text>
          - Înregistrarea în platformă.
        </Text>
        <Text>
          - Încheierea și executarea contractului electronic între noi (accesul la servicii).
        </Text>
        <Text>
          - Pentru a-ți oferi accesul la diverse facilități sau materiale.
        </Text>
        <Text>
          - Pentru a gestiona relația pe care o avem cu tine și pentru a-ți oferi asistență.
        </Text>
        <Text>
          - Scopuri analitice și statistice, pentru a îmbunătăți funcționalitatea și experiența utilizatorilor.
        </Text>
        <Text>
          - În scopuri de marketing, dacă avem acordul tău sau dacă ești beneficiarul nostru și informațiile ar putea fi de mare interes pentru tine.
        </Text>
      </View>
      
      <View className='border-b'/>
      
      <View style={styles.view}>
        <Text className="text-xl">
          CU CINE ÎMPĂRȚIM DATELE TALE?
        </Text>
        <Text>
          - Furnizori de servicii IT pentru compania noastră (găzduire și stocare de date - Amazon) sau furnizori cărora le externalizăm anumite servicii de asistență tehnică pentru platforma online sau pentru aplicația mobilă.
        </Text>
        <Text>
          - Procesatorii de plăti Stripe și Chargebee
        </Text>
        <Text>
          - Terți care plasează cookie-uri: google.com, hubspot.com, facebook.com.
        </Text>
        <Text>
          - Platformele online: Facebook, Twitter, LinkedIn, Instagram, Youtube.
        </Text>
        <Text>
          - Autorități de reglementare și alte autorități ale statului, dacă sunt solicitate prin cerințe legale sau statutare.
        </Text>
      </View>
      
      <View className='border-b'/>
      
      <View style={styles.view}>
        <Text className={"text-xl"}>
          UNDE STOCĂM DATELE TALE?
        </Text>
        <Text>
          - Echipa noastră lucrează în București, România.
        </Text>
        <Text>
          - Datele le stocăm în cloud-ul Amazon.
        </Text>
        <Text>
          - Unii dintre furnizorii noștri de prestări servicii e posibil să fie localizați în afara Spațiului Economic European (SEE), astfel încât procesarea din partea lor a datelor tale personale va implica un transfer de date în afara SEE.
        </Text>
        <Text>
          - De fiecare dată când vom transfera datele tale personale în afara SEE, ne vom asigura că există un nivel de protecția similar celui oferit de UE.
        </Text>
      </View>
      
      <View className='border-b'/>
      
      <View style={styles.view}>
        <Text className={'text-xl'}>
          ANGAJAMENT
        </Text>
        <Text className={"text-xl"} style={{fontWeight: 'bold'}}>
          Noi chiar avem grijă de datele tale!
        </Text>
        <Text className={"text-lg"}>
          Prin urmare, ne-am angajat să le prelucrăm numai în scopurile pentru care ni le-ați oferit, conform așteptărilor dvs., în condiții de securitate, confidențialitate și în conformitate cu principiile de protecție a datelor.
        </Text>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create<NamedStyles<any>>({
  view: {
    gap: 5,
    paddingRight: 5
  }
})
