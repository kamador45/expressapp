import {TextInput, StyleSheet} from "react-native";

const PasswordField = ({
                              width="100%",
                              height=50,
                              placeHolder="",
                              onChangeText = () => {},
                              value="",
                              placeHolderTextColor=""
                          }) => {
    return (
        <TextInput
            placeholder={placeHolder}
            placeholderTextColor={placeHolderTextColor}
            onChangeText={onChangeText}
            value={value}
            keyboardType={"default"}
            secureTextEntry={true}
            style={[styles.fields, {width: width, height: height}, styles.marginField]}
        />
    )
}

const styles = StyleSheet.create({
    fields:{
        backgroundColor:"#fff",
        alignSelf:"center",
        borderRadius:10,
        borderWidth: 0.5,
        borderColor:"gray",
        paddingHorizontal: 10
    },
    marginField:{
        margin:5,
        color:"#000"
    }
})

export default PasswordField;
