// Tijdelijke data die normaal uit de database komt.
const temporary_data = [
    {
        titel: "Dit is een eenmalige afspraak",
        start: new Date(2019,0,15,10),
        einde: new Date(2019,0,15,12),
        heleDag: false,
        backgroundColor: "red",
        color: "white",
        locatie: "Dit is een locatie",
        info: "Verdere informatie!",
        agenda: "Persoonlijk",
        gemaaktDoor: "Docent"
    },
    {
        titel: "Dit is een afspraak over enkele dagen",
        start: new Date(2019,0,16,14, 30),
        einde: new Date(2019,0,18,16),
        heleDag: false,
        backgroundColor: "green",
        color: "white",
        locatie: "Dit is een locatie",
        info: "Verdere informatie!",
        agenda: "Algemeen",
        gemaaktDoor: "Leerling"
    }
];



$(document).ready(function(){

    $(function() {
        $('#s1_persoonlijk').show();
        $('#s1_shared').hide();
        $('#s1_algemeen').hide();
        $('#s1_options').change(function(){
            $('.s1_task_content').hide();
            $('#' + $(this).val()).show();
        });
    });

    $(".s3-toggleSideMenu").click(function(){
        $(".s3-sidemenu-wrap").addClass('col-lg-3').toggle();/*css('display','block') .showandhide*/
        $(".s3-content-wrap").toggleClass('col-lg-9');
    });



    // Group 2: Calendar
    $('#s2_cal').fullCalendar({
        // put your options and callbacks here
        header: {
            left: 'prev,next today ',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        timeFormat: 'H:mm',
        events: temporary_data.map(i => {
            return {
                title: i.titel,
                start: i.start,
                end: i.einde,
                allDay: i.heleDag,
                color: i.backgroundColor,
                textColor: i.color,
                locatie: i.locatie,
                info: i.info,
                agenda: i.agenda,
                createdBy: i.gemaaktDoor
            }
        }),
        eventClick: function(calEvent, jsEvent, view) {
            console.log(calEvent);
            $("#s2_afspraak_titel").html(calEvent.title);
            $("#s2_afspraak_datum").html(`${dateToString(calEvent.start._d)} - ${dateToString(calEvent.end._d)}`);
            $("#s2_afspraak_agenda").css('background-color', calEvent.color).css('color', calEvent.textColor).html(calEvent.agenda);
            $("#s2_afspraak_locatie").html(calEvent.locatie);
            $("#s2_afspraak_info").html(calEvent.info);
            $("#s2_afspraakModal").removeClass('editing');
            $("#s2_afspraak_creator").html(calEvent.createdBy)
            $("#s2_afspraakModal").modal('show');

            calEvent.start._d.addHours(1)
            calEvent.end._d.addHours(1)
        
            $("#s2_afspraak_titel_edit").val(calEvent.title);
            $("#s2_afspraak_datum_start_edit").val(calEvent.start._d.toJSON().slice(0,19));
            $("#s2_afspraak_datum_end_edit").val(calEvent.end._d.toJSON().slice(0,19));
            $("#s2_afspraak_agenda_edit").val(calEvent.agenda);
            $("#s2_afspraak_agenda_kleur_edit").val(calEvent.color);
            $("#s2_afspraak_locatie_edit").val(calEvent.locatie)
            $("#s2_afspraak_info_edit").val(calEvent.info)
        }
    });

    $( "body" ).on('click', '#afspraak_aanpassen', function() {
        $("#s2_afspraakModal").addClass('editing');
    })

});


function dateToString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return (
        (day.toString().length === 1 ? `0${day}` : day).toString() +
        "/" +
        (month.toString().length === 1 ? `0${month}` : month).toString() +
        "/" +
        year + " " + 
        (hour.toString().length === 1 ? `0${hour}` : hour).toString() + 
        ":" + 
        (minute.toString().length === 1 ? `0${minute}` : minute).toString()
    )
}
Date.prototype.addHours = function(h) {    
    this.setTime(this.getTime() + (h*60*60*1000)); 
    return this;   
}