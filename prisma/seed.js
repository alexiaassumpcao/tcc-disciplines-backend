import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const matematica = await prisma.Preference.create({
        data: {
            name: 'Não específica',
            disciplines: {
                create: [
                    {
                        code: ['IM478'],
                        name: 'ÁLGEBRA LINEAR COMPUTACIONAL',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM403'],
                        name: 'CALCULO I',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM404'],
                        name: 'CALCULO II',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    /*{
                        code: [''],
                        name: 'CALCULO III',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },*/
                    {
                        code: ['TM406'],
                        name: 'CALCULO APLICADO',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM407'],
                        name: 'FÍSICA PARA CIÊNCIA DA COMPUTAÇÃO',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM885'],
                        name: 'GEOMETRIA ANALÍTICA',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM859'],
                        name: 'PROBABILIDADE E ESTATÍSTICA PARA CIÊNCIA DA COMPUTAÇÃO',
                        area: 'Matemática',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM853'],
                        name: 'CIRCUITOS DIGITAIS',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM404', 'TN707'],
                        name: 'INTRODUÇÃO A CIÊNCIA DA COMPUTAÇÃO',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },        
                    {
                        code: ['TN725'],
                        name: 'COMPILADORES',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM421'],
                        name: 'COMPUTAÇÃO GRÁFICA',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TN703'],
                        name: 'COMPUTADORES E SOCIEDADE',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    
                    {
                        code: ['TN730'],
                        name: 'ESTRUTURA DE DADOS II',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                
                    
                    {
                        code: ['TN720'],
                        name: 'LINGUAGENS DE PROGRAMAÇÃO',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    
                    {
                        code: ['TN726'],
                        name: 'MÉTODOS NUMÉRICOS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    
                    
                    {
                        code: ['TN729'],
                        name: 'REDES E SISTEMAS DISTRIBUÍDOS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    }
                ]
            }
        }
    })
    const algoritmosECombinatoria = await prisma.Preference.create({
        data: {
            name: 'Algoritmos e Combinatória',
            disciplines: {
                create: [
                    {
                        code: ['IM429'],
                        name: 'ALGEBRA LINEAR I',
                        area: 'Engenharia de Software',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM424', 'TN711'],
                        name: 'ESTRUTURAs DE DADOS I',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TN709'],
                        name: 'LÓGICA PARA COMPUTAÇÃO',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM403','TN705'],
                        name: 'MATEMÁTICA DISCRETA PARA COMPUTAÇÃO',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TN723'],
                        name: 'ANÁLISE E PROJETO DE ALGORITMOS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TN718', 'TM408'],
                        name: 'GRAFOS E ALGORITMOS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM854'],
                        name: 'LINGUAGENS FORMAIS E AUTÔMATOS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM417'],
                        name: 'OTIMIZAÇÃO LINEAR',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM420','TN751'],
                        name: 'TÓPICOS ESPECIAIS EM OTIMIZAÇÃO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    /*{
                        code: [''],
                        name: 'OTIMIZAÇÃO COMBINATÓRIA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTRODUÇÃO A BIOLOGIA COMPUTACIONAL',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTRODUÇÃO À PESQUISA OPERACIONAL',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'TEORIA DOS GRAFOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'TÓPICOS ESPECIAIS EM GRAFOS E ALGORITMOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'TEORIA DOS JOGOS ALGORÍTMICA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                ]
            }
        }
    })
    const engSistemas = await prisma.Preference.create({
        data: {
            name: 'Engenharia de Sistemas e Informação',
            disciplines: {
                create: [
                    {
                        code: ['IM877'],
                        name: 'EMPREENDEDORISMO EM INFORMÁTICA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TN727', 'TM426'],
                        name: 'BANCO DE DADOS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    /*{
                        code: [''],
                        name: 'INTRODUÇÃO AOS SISTEMAS DE INFORMAÇÃO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                    {
                        code: ['TM415'],
                        name: 'TÓPICOS ESPECIAIS EM BANCO DE DADOS E ENGENHARIA DE SOFTWARE',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TN716', 'TM412'],
                        name: 'MODELAGEM E PROJETO DE SOFTWARE',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM419', 'TN731'],
                        name: 'GERÊNCIA DE PROJETOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TN710'],
                        name: 'ENGENHARIA DE SOFTWARE I',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    /*{
                        code: [''],
                        name: 'ENGENHARIA DE SOFTWARE II',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                    {
                        code: ['TN721'],
                        name: 'ARQUITETURA DE SOFTWARE',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TM431'],
                        name: 'INTRODUÇÃO À TEORIA DAS REDES DE PETRI',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TM432'],
                        name: 'MODELAGEM DE SOFTWARE COM REDES DE PETRI',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    /*{
                        code: [''],
                        name: 'MODELAGEM E ANÁLISE FORMAL DE PROCESSOS DE NEGÓCIO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                    {
                        code: ['TN732'],
                        name: 'MEDIÇÃO E QUALIDADE DE SOFTWARE',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    /* {
                        code: [''],
                        name: 'GESTÃO DE PROCESSOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTRODUÇÃO À ENGENHARIA DE SOFTWARE EXPERIMENTAL',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'GOVERNANÇA DE TECNOLOGIA DA INFORMAÇÃO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTERAÇÃO HUMANO-COMPUTADOR',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'ENGENHARIA DE REQUISITOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'BANCO DE DADOS II',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTRODUÇÃO À WEB SEMÂNTICA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTELIGÊNCIA DE NEGÓCIOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                    {
                        code: ['TM411'],
                        name: 'TÓPICOS ESPECIAIS EM CIÊNCIA DA COMPUTAÇÃO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                ]
            }
        }
    })

                
    const sistemasComputacao = await prisma.Preference.create({
        data: {
            name: 'Sistemas de Computação',
            disciplines: {
                create: [
                    {
                        code: ['TN712', 'TM405'],
                        name: 'ARQUITETURA DE COMPUTADORES',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TN748', 'TM409'],
                        name: 'ARQUITETURA DE COMPUTADORES II',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['IM868'],
                        name: 'SISTEMAS OPERACIONAIS',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['IM873'],
                        name: 'SISTEMAS DISTRIBUÍDOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TM418'],
                        name: 'TÓPICOS ESPECIAIS EM PROGRAMAÇÃO DE COMPUTADORES',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TN706', 'TM422'],
                        name: 'PROGRAMAÇÃO ESTRUTURADA',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },          
                    {
                        code: ['TN717', 'TM423'],
                        name: 'PROGRAMAÇÃO ORIENTADA A OBJETOS',
                        area: 'Programação',
                        category: 'REQUIRED'
                    },
                    /*{
                        code: [''],
                        name: 'PROGRAMAÇÃO PARALELA E DISTRIBUÍDA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'COMPUTAÇÃO DE ALTO DESEMPENHO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'ALGORITMOS PARALELOS E DISTRIBUÍDOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTRODUÇÃO AOS DISPOSITIVOS MÓVEIS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'PROGRAMAÇÃO EM GPU',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                    {
                        code: ['TM430'],
                        name: 'REDES DE COMPUTADORES SEM FIO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['IM879'],
                        name: 'SISTEMAS MULTIMÍDIA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    /*{
                        code: [''],
                        name: 'ROTEAMENTO EM REDES DE COMPUTADORES',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                ]
            }
        }
    })
                
    const sistemasInteligentes = await prisma.Preference.create({
        data: {
            name: 'Sistemas Inteligentes',
            disciplines: {
                create: [
                    {
                        code: ['TN724', 'IM870'],
                        name: 'INTELIGÊNCIA ARTIFICIAL',
                        area: 'Formação Horizontal',
                        category: 'REQUIRED'
                    },
                    {
                        code: ['TM416'],
                        name: 'TÓPICOS ESPECIAIS EM INTELIGÊNCIA ARTIFICIAL',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TM444'],
                        name: 'BUSCA E RECUPERAÇÃO DA INFORMAÇÃO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: ['TN745'],
                        name: 'APRENDIZADO DE MÁQUINA',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    /*{
                        code: [''],
                        name: 'REDES NEURAIS ARTIFICIAIS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'MINERAÇÃO DE DADOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'PROCESSAMENTO DE LINGUAGEM NATURAL',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'PROCESSAMENTO DE IMAGENS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTRODUÇÃO À TEORIA DE SISTEMAS DE RECOMENDAÇÃO',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },
                    {
                        code: [''],
                        name: 'INTELIGÊNCIA DE NEGÓCIOS',
                        area: 'Formação Específica',
                        category: 'OPTIONAL'
                    },*/
                ]
            }
        }
    })  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  // npx prisma db seed


//[{"label": "Área de dados", "preferenceValue": "ca099592-6135-4e78-98b2-3eda8c0f11ea"},{"label": "Redes", "preferenceValue": "322a6ece-6909-4ff6-b5c8-f4e1ae740f21"},{"label": "Desenvolvimento Web", "preferenceValue": "b89e6ea4-2a5c-4345-abb2-665729228560"},{"label": "Engenharia de Requisitos", "preferenceValue": "b89e6ea4-2a5c-4345-abb2-665729228560"}, {"label": "Infraestrutura de Sistemas", "preferenceValue": "322a6ece-6909-4ff6-b5c8-f4e1ae740f21"},{"label": "Design de Arquitetura de Sistemas", "preferenceValue": "b89e6ea4-2a5c-4345-abb2-665729228560"}, {"label": "Design de Arquitetura de Computadores", "preferenceValue": "322a6ece-6909-4ff6-b5c8-f4e1ae740f21"}, {"label": "Desenvolvimento de jogos", "preferenceValue": "322a6ece-6909-4ff6-b5c8-f4e1ae740f21"}, {"label": "Otimização de Problemas Computacionais", "preferenceValue": "39d4fb68-1fe9-4bcf-9b87-e0dfee4e0d18"}, {"label": "Segurança", "preferenceValue": "322a6ece-6909-4ff6-b5c8-f4e1ae740f21"}, {"label": "Nenhuma", "preferenceValue": "2129d957-bb76-4c06-8364-e2f4bcf7d51e"}]