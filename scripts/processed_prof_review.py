import json
PATH = '../courses.json'
DEST = '../prof_to_link.json'

with open(PATH,'rb') as f:
    data = json.load(f)
   

if __name__ == '__main__':
    collector = {}
    res = {}
    res['prof_to_links'] = []
    lst = []

    for course in data:
        for section in course['meeting_sections']:
            for inst in section['instructors']:
                if len(inst.split(' ')) == 4:
                    ins1 = inst.split(' ')[0] + ' ' + inst.split(' ')[1]
                    ins2 = inst.split(' ')[2] + ' ' + inst.split(' ')[3]
                    if ins1 not in collector:
                        collector = {}
                        collector[ins1] = ''
                        lst.append(collector)

                    if ins2 not in collector:
                        collector = {}
                        collector[ins2] = ''
                        lst.append(collector)
                else:

                    if inst not in collector:
                        collector = {}
                        collector[inst] = ''
                        lst.append(collector)
    
    prof_to_links = [
        {'E Hehner': 'http://www.cs.utoronto.ca/~hehner/'},
        {'A Demke Brown': 'http://www.cs.toronto.edu/~demke/'},
        {'K Truong': 'http://www.cs.toronto.edu/~khai/'},
        {'H Kontozopoulos': 'https://www.helenissocial.ca/'},
        {'A Nikolov': 'http://www.cs.toronto.edu/~anikolov/'},
        {'A Farahmand': 'http://academic.sologen.net/'},
        {'K Jackson': 'http://www.cs.toronto.edu/~krj/'},
        {'J Smith': 'http://www.cs.toronto.edu/~jsmith/'},
        {'F Chevalier': 'http://fannychevalier.net/'},
        {'S Shirali-Shahreza': 'https://sajad.shirali.ir/'},
        {'M Stumm': 'https://www.ece.utoronto.ca/people/stumm-m/'},
        {'M Craig': 'https://michellecraig.github.io/'},
        {'B Taati': 'http://www.cs.toronto.edu/~taati/index.htm'},
        {'E Adum': 'https://ca.linkedin.com/in/eliasadum'},
        {'M Chechik': 'http://www.cs.toronto.edu/~chechik/'},
        {'D Rosu': 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=17795'
         },
        {'M Badr': 'https://ca.linkedin.com/in/mariobadr'},
        {'G Penn': 'http://www.cs.toronto.edu/~gpenn/'},
        {'T Grossman': 'http://www.tovigrossman.com/'},
        {'B Aameri': 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1982478'
         },
        {'L Shorser': 'https://www.math.toronto.edu/cms/people/faculty/shorser-lindsey/'
         },
        {'S Engels': 'http://www.cs.toronto.edu/~sengels/'},
        {'G Baumgartner': 'http://www.cs.toronto.edu/~gfb/'},
        {'P Gries': 'http://www.cs.toronto.edu/~pgries/'},
        {'M Zaleski': 'http://www.cs.toronto.edu/~matz/'},
        {'D Jorjani': 'https://angel.co/davidj'},
        {'J Campbell': 'https://jencampbell.github.io/'},
        {'N Shah': 'http://www.cs.toronto.edu/~nisarg/'},
        {'K Reid': 'http://www.cs.toronto.edu/~reid/'},
        {'M Brudno': 'http://www.cs.toronto.edu/~brudno/public/'},
        {'C Christara': 'http://www.cs.toronto.edu/~ccc/'},
        {'S Ahmed': 'https://www.ishtiaque.net/about-me'},
        {'R Grosse': 'http://www.cs.toronto.edu/~rgrosse/'},
        {'K Singh': 'http://www.dgp.toronto.edu/~karan/'},
        {'T Fairgrieve': 'http://www.cs.toronto.edu/~tff/'},
        {'M Kazakevich': 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=2351950'
         },
        {'F Bacchus': 'http://www.cs.toronto.edu/~fbacchus/'},
        {'A Anderson': 'http://www.cs.toronto.edu/~ashton/'},
        {'M Grech': 'https://www.dcsil.ca/team'},
        {'A Jacobson': 'http://www.cs.toronto.edu/~jacobson/'},
        {'S Meraji': 'https://ca.linkedin.com/in/sina-meraji-8030b321'
         },
        {'D Heap': 'http://www.cs.toronto.edu/~heap/'},
        {'D Liu': 'http://www.cs.toronto.edu/~david/'},
        {'T Kosteski': 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=2162028'
         },
        {'J Lim': 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=2071834'
         },
        {'A Borodin': 'http://www.ratemyprofessors.com/ShowRatings.jsp?tid=1467912'
         },
        {'X Zhao': 'https://www.xuzhao.net/'},
        {'J Carrasquilla Alvarez': 'https://vectorinstitute.ai/team/juan-felipe-carrasquilla/'
         },
        ]
    for i in prof_to_links:
        res['prof_to_links'].append(i)
        
    print(res)
    
    with open(DEST, 'w', encoding="utf8") as outfile:  
        json.dump(res, outfile)
