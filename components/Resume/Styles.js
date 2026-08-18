import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        color: '#000',
        paddingVertical: 18,
        paddingHorizontal: 22,
        fontFamily: 'Times-Roman',
    },

    header: {
        textAlign: 'center',
    },

    header__name: {
        color: '#111',
        fontSize: 18,
        fontFamily: 'Times-Bold',
        textAlign: 'center',
    },
    sub__header__name: {
        color: '#111',
        fontSize: 12.5,
        fontFamily: 'Times-Bold',
        textAlign: 'center',
    },
    header__links: {
        color: '#000',
        fontSize: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginTop: 4,
        marginBottom: 3,
    },

    education_note: {
        fontSize: 8.5,
        color: '#333',
        fontFamily: 'Times-Italic',
        marginTop: 3,
        marginBottom: 1,
        lineHeight: 1.3,
    },

    title_wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 10.5,
    },

    subTitle_wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 9.8,
    },

    title: {
        fontFamily: 'Times-Bold',
        marginRight: 'auto',
        color: '#000',
    },
    date: {
        fontFamily: 'Times-Italic',
        fontSize: 9.5,
    },

    line: {
        borderBottom: '1px solid #eee',
        margin: '2px 0px',
    },
    lists: {
        fontSize: 9.2,
        marginTop: 1,
    },
    /** Separator applied between sections only — never after the last one. */
    section_gap: {
        paddingBottom: 3,
        marginBottom: 3,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
    },
    link: {
        color: '#000',
    },
});

export default styles;
