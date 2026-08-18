import { StyleSheet, Text, View } from '@react-pdf/renderer';

const Section = ({ title, style, children }) => {
    const styles = StyleSheet.create({
        section_title: {
            textTransform: 'uppercase',
            color: '#000',
            fontSize: 11.5,
        },

        section_title_underline: {
            height: 1,
            margin: '2px 0px 3px 0px',
            backgroundColor: '#000',
        },
    });

    // No trailing spacer or border here on purpose: as its own box at the end
    // of the last section it could not fit in the space left at the foot of a
    // page and got pushed onto a new one, producing a blank page. The caller
    // draws separators *between* sections instead.
    return (
        <View style={style}>
            {title && (
                <>
                    <Text style={styles.section_title}>{title}</Text>
                    <View style={styles.section_title_underline}></View>
                </>
            )}

            {children}
        </View>
    );
};

export default Section;
