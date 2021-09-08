import PdfPrinter from 'pdfmake'
import striptags from 'striptags'
import axios from 'axios'

export const generatePDFReadableStream = async (profile, expUser) => {
    const fonts = {
        Roboto: {
            normal: "Helvetica",
            bold: "Helvetica-Bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-Oblique",
        }
    }

    let profileImg = {}
    if(profile.image) {
        const response = await axios.get(profile.image, {
            responseType: "arraybuffer"
        })
        const profileImgURLParts = profile.image.split("/")
        const fileName = profileImgURLParts[profileImgURLParts.length -1]
        const [id, extension] = fileName.split(".")
        const base64 = response.data.toString("base64")
        const base64Img = `data:image/${extension};base64,${base64}`
        profileImg = { image: base64Img, width: 250, margin: [0, 0, 0, 30] }
    }
    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content: [
            {
                text: `${profile.name} ${profile.surname}`,
                style: 'header',
                alignment: 'center',
            },
            {
                text: `${profile.title}`,
                style: 'subheader',
                alignment: 'center',
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', 10, '*'],
                    body: [
                        [ {text: '', style: 'tableHeaders'}, '', {text: '', style: 'tableHeaders'}],
                        [
                            profileImg ,
                            '',
                            {
                                text: [
                                    {text: `Name:\n ${profile.name}\n\n`},
                                    {text: `Surname:\n ${profile.surname}\n\n`},
                                    {text: `Title:\n ${profile.title}\n\n`},
                                    {text: `email:\n ${profile.email}\n\n`},
                                    {text: `Area:\n ${profile.area}\n\n`},
                                    {text: `Bio:\n ${profile.bio}\n\n`},
                                ]
                            }
                        ]
                    ]
                },
                layout: 'noBorders'
            },
            {
                text: `Experience`,
                style: 'header',
            },
            expUser.map((exp) => (
                `
                Role: ${exp.role}\n
                Company: ${exp.company}\n
                Start date: ${exp.startDate}\n
                End date: ${exp.endDate}\n
                Description: ${exp.description}\n
                Area: ${exp.area}\n
                `)
            )
        ],
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 12,
			    bold: true,
                margin: [5, 5, 5, 10]
            },
            tableExample: {
                margin: [5, 5, 5, 10]
            },
            tableHeaders: {
                bold: true,
                alignment: 'center',
                margin: [0, 10, 0, 10]
            }
        }
    }

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {})
    pdfReadableStream.end()
    return pdfReadableStream
}