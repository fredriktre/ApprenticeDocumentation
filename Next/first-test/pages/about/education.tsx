import Layout from "@/components/Layout"
import Card from '@/components/Card'
import Link from 'next/link'

const education = () => {
  return (
    <Layout UseNav={true}>

        <Card
            bg="bg-cyan-800"
            bordercolor="border-cyan-300"
            className="w-4/5 mx-auto flex lg:flex-row flex-col items-stretch gap-5">
            <div className="w-full flex flex-col gap-5">
                <Card 
                    bg="bg-cyan-700"
                    bordercolor="border-cyan-300"
                    className="h-full flex items-center flex-col">
                        <h2 className="mr-auto">Primary school</h2>
                        <div className="mr-auto">
                            <p>Lande Barneskole - Elementary School - 2010 {'>'} 2017</p>
                            <p>Kruseløkka Ungdomskole - Middle School - 2017 {'>'} 2020</p>
                        </div>
                </Card>
                <Card 
                    bg="bg-cyan-700"
                    bordercolor="border-cyan-300"
                    className="h-full flex items-center flex-col">
                        <h2 className="mr-auto">High school</h2>
                        <div className="mr-auto">
                            <p>Halden Videregåendeskole - 2020 {'>'} 2021</p>
                            <p>Glemmen Videregåendeskole - 2021 {'>'} 2022</p>
                        </div>

                </Card>
                <Card 
                    bg="bg-cyan-700"
                    bordercolor="border-cyan-300"
                    className="h-full flex items-center flex-col">
                        <h2 className="mr-auto">Apprenticeship</h2>
                        <div className="mr-auto">
                            <p>Opplæringskontoret for visuell kommunikasjon - 2022 {'>'} 2024 </p>
                        </div>
                </Card>
            </div>
            <Card 
                bg="bg-cyan-700"
                bordercolor="border-cyan-300"
                className="w-full max-h-[30rem] flex items-baseline overflow-y-scroll
                sb sw-4 sh-4">
                    <p>
                        In Norway, the first 10 years are mandatory. 
                        And I didn't exactly get to do much. 
                        Math was boring until it suddenly got too hard. 
                        And all this literature just confused me.<br /><br />
                        When I was looking into what I would do in High school,
                        as that can be chosen. I stumbled upon a field of 
                        education named Information Technology and Media 
                        Production (IM for short). It almost felt like a calling. 
                        “This was it” was my first thought when I read that name. 
                        And I put it as my first choice.<br /><br />
                        I got accepted to my second choice school, and started 
                        learning. First project I finished was a small escape 
                        room game. Which I got a grade 6 on (equal to grade A
                        , we got no A+).<br /><br />                        
                        After that, it was very up and down.
                        As the field of education did not have a proper program,
                        the teachers more or less had to make up lessons on the move.
                        And since there most likely wasn't a lot of talking happening
                        between them. We ended up with multiple projects at once multiple times.
                        This did teach me how to handle stress to a certain degree so that's fine 
                        I guess.<br /><br />
                        Year 2 of Vgs. I managed to get into my old first choice! And it was
                        a lot more chillax than Halden. Maybe a bit too lax though, as I didn't
                        really work much during this period, as I saw no need to.
                        I mainly got to know the basics of c# and got decently good at css.<br /><br />
                        15th of August 2022 I joined Bas Kommunikasjon as an apprentice. With my
                        representative being Opplæringskontoret for visuell kommunikasjon.<br /><br />
                        At first, we were just learning some basics of HTML Email. Then, I got a task,
                        in which I ended up using 100 hours to finish. As things broke, things needed changes,
                        new things were added. Bit by bit the hours accumilated. Though one thing is for certain,
                        I learned a TON about how HTML email works.<br /><br />
                        After this, I just did small fixes here and there, learning small things along the way.
                        I also started doing my own projects. From small animation demos to full projects with
                        multiple features.<br /><br />
                        Overall, my experience in this field has been, well, "everywhere". And I have learned a lot.
                        I am thankful to all of it of course. I wasn't when it happened, but I have learned from it all.
                        And knowledge itself is not something you should detest.<br /><br />
                        I will add a bit more once I finish my apprenticeship in 15th of August 2024!
                    </p>
            </Card>
        </Card>

    </Layout>
  )
}

export default education