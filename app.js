const m=document.getElementById('modal'),f=document.getElementById('form'),C=window.ALAMAI_CONFIG,sb=window.supabase.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
document.querySelectorAll('.open-modal').forEach(b=>b.onclick=()=>{m.classList.add('on');fields.hidden=false;thanks.hidden=true});
m.onclick=e=>{if(e.target===m||e.target.classList.contains('x'))m.classList.remove('on')};
document.onkeydown=e=>{if(e.key==='Escape')m.classList.remove('on')};
f.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),btn=f.querySelector('button.btn');btn.disabled=true;btn.textContent='Sending…';
const{error}=await sb.from('website_leads').insert({name:d.name,email:d.email,phone:d.phone||null,industry:d.industry,message:d.msg||null});
btn.disabled=false;btn.textContent='Send →';if(error){alert('Sorry, could not send: '+error.message);return}f.reset();fields.hidden=true;thanks.hidden=false};
