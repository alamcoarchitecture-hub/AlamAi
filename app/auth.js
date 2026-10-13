const C=window.ALAMAI_CONFIG,sb=window.supabase.createClient(C.SUPABASE_URL,C.SUPABASE_KEY);
sb.auth.getSession().then(({data})=>{if(data.session)location.href='index.html'});
let mode='in';const f=document.getElementById('f');
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));nm.hidden=mode=='in';go.textContent=mode=='in'?'Login →':'Create account →';err.textContent='';err.style.color=''});
f.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f)),email=d.email.trim().toLowerCase();err.style.color='';err.textContent='Please wait…';go.disabled=true;
try{if(mode=='in'){const{error}=await sb.auth.signInWithPassword({email,password:d.pw});if(error)throw error;location.href='index.html'}
else{if(!d.name)throw Error('Please enter your name.');const{data,error}=await sb.auth.signUp({email,password:d.pw,options:{data:{full_name:d.name},emailRedirectTo:new URL('index.html',location.href).href}});if(error)throw error;
if(data.session)location.href='index.html';else{err.style.color='#6ee59a';err.textContent='Account created! Check your email to confirm, then log in.'}}}
catch(x){err.textContent=x.message}finally{go.disabled=false}};
