import Link from 'next/link';
import type { Article } from '../articles';

export const postHospitalHomeCareMedicare: Article = {
  slug: 'post-hospital-home-care-medicare-coverage',
  title: 'Post-Hospital Home Care: What Medicare Covers in the First 60 Days',
  description:
    'After a hospital stay, Medicare can cover skilled home care — but the rules are narrow and the window is short. Here is exactly what is covered, what is not, and how to choose an agency before discharge.',
  publishedAt: '2026-05-05',
  updatedAt: '2026-05-05',
  author: {
    name: 'WeCarely Editorial',
    role: 'Independent home care directory',
  },
  topic: 'Medicare & insurance',
  body: () => (
    <>
      <p>
        A parent is discharged from the hospital. The social worker hands you a
        list of home health agencies and tells you to &ldquo;follow up with home
        care.&rdquo; You have 24 hours, maybe 48. You do not know which agencies
        are good, which accept your parent&apos;s insurance, or what Medicare
        will actually pay for.
      </p>

      <p>
        This guide covers exactly those questions, without the jargon.
      </p>

      <h2>The Medicare home health benefit: what it is</h2>

      <p>
        Medicare Part A and Part B both include a home health benefit. When all
        qualifying criteria are met, Medicare pays 100% of the cost of covered
        home health services — there is no deductible or copay for the services
        themselves. This is one of the most generous benefits in Medicare, and
        one of the most underused because families do not know it exists or do
        not know how to access it.
      </p>

      <p>
        The benefit is not unlimited. It is structured around&nbsp;
        <strong>60-day episodes of care</strong>, and it covers skilled services
        — not the custodial care that most families assume is included.
      </p>

      <h2>The four qualifying criteria</h2>

      <p>
        To qualify for Medicare home health coverage, all four of the following
        must be true:
      </p>

      <ol>
        <li>
          <strong>The patient must be homebound.</strong> Medicare&apos;s
          definition of homebound is specific: leaving home requires considerable
          effort, and absences are infrequent, short in duration, or for medical
          appointments. A patient who can drive to the grocery store regularly
          does not meet this standard — even if they recently had surgery.
        </li>
        <li>
          <strong>Skilled care must be medically necessary.</strong> A physician
          must certify that the patient needs at least one skilled service:
          skilled nursing care, physical therapy, speech-language pathology
          services, or occupational therapy (when combined with one of the
          others). The need must be documented in the medical record.
        </li>
        <li>
          <strong>A physician must authorize the plan of care.</strong> A
          doctor, nurse practitioner, clinical nurse specialist, or physician
          assistant must establish a plan of care and re-certify it at the
          start of each 60-day episode.
        </li>
        <li>
          <strong>The agency must be Medicare-certified.</strong> Only agencies
          that have been certified by CMS can bill Medicare for home health
          services. WeCarely lists only Medicare-certified agencies.
        </li>
      </ol>

      <h2>What Medicare does cover</h2>

      <p>
        Within a qualifying episode, Medicare covers the following:
      </p>

      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>What it includes</th>
            <th>Typical frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Skilled nursing</td>
            <td>Wound care, medication management, injection training, IV therapy, monitoring of acute conditions</td>
            <td>1–5 visits/week</td>
          </tr>
          <tr>
            <td>Physical therapy</td>
            <td>Strength and mobility restoration, fall prevention, gait training, post-surgical rehabilitation</td>
            <td>2–5 visits/week</td>
          </tr>
          <tr>
            <td>Occupational therapy</td>
            <td>Relearning daily tasks (dressing, bathing, cooking), adaptive equipment training</td>
            <td>1–3 visits/week</td>
          </tr>
          <tr>
            <td>Speech-language pathology</td>
            <td>Swallowing assessment, speech rehabilitation, cognitive-communication therapy</td>
            <td>1–3 visits/week</td>
          </tr>
          <tr>
            <td>Home health aide visits</td>
            <td>Personal care (bathing, grooming) — <strong>only when skilled care is also ongoing</strong></td>
            <td>Up to daily, limited hours</td>
          </tr>
          <tr>
            <td>Medical social work</td>
            <td>Care planning, connecting to community resources, family counseling</td>
            <td>As needed</td>
          </tr>
        </tbody>
      </table>

      <p>
        One important nuance: Medicare covers home health aide visits only as
        long as skilled nursing or therapy is also ongoing. Once the skilled
        service ends — when the nurse signs off the wound care, when therapy
        goals are met — the aide coverage ends with it.
      </p>

      <h2>What Medicare does not cover</h2>

      <p>
        This is where most families are blindsided. Medicare home health does
        not cover:
      </p>

      <ul>
        <li>
          <strong>24-hour or live-in care.</strong> Home health aide visits are
          intermittent — typically a few hours per visit, not around-the-clock
          coverage.
        </li>
        <li>
          <strong>Custodial or companion care by itself.</strong> Help with
          cooking, cleaning, laundry, medication reminders, and companionship is
          not covered unless it accompanies a skilled service visit.
        </li>
        <li>
          <strong>Homemaker services.</strong> Grocery shopping, errands, and
          household management are not covered.
        </li>
        <li>
          <strong>Personal care when skilled care has ended.</strong> Once the
          physician&apos;s plan of care is complete, aide visits stop — even if
          the patient still needs help bathing and dressing.
        </li>
      </ul>

      <p>
        The gap this creates is significant and commonly misunderstood: a patient
        may need help with personal care 7 days a week, but Medicare will only
        pay for it during the weeks when a nurse or therapist is also visiting.
        Families typically need to arrange private-pay or Medicaid-funded personal
        care to fill this gap.
      </p>

      <h2>The 60-day episode structure</h2>

      <p>
        Medicare home health care is structured in 60-day episodes. At the start
        of each episode, the agency conducts an OASIS assessment — a standardized
        evaluation of the patient&apos;s functional status — and the physician
        certifies the plan of care. At day 60, the episode ends. If the patient
        still meets the qualifying criteria, a new episode can begin with a new
        physician certification.
      </p>

      <p>
        There is no fixed limit on the number of episodes. A patient who
        continues to need skilled care and meets the homebound criterion can
        remain on the benefit indefinitely — though in practice, Medicare auditors
        scrutinize long-running episodes, and agencies must document that ongoing
        care remains clinically justified.
      </p>

      <h2>What to do before hospital discharge</h2>

      <p>
        The discharge process is chaotic. Social workers are managing multiple
        cases simultaneously; the patient may not be thinking clearly; the family
        may be exhausted and overwhelmed. Here is a checklist of what to do
        before leaving the hospital:
      </p>

      <ol>
        <li>
          <strong>Ask the social worker whether your family member qualifies
          for Medicare home health.</strong> Do not assume. Ask explicitly. If the
          answer is yes, ask which agencies the hospital works with — and
          understand that you are not required to use one of those agencies.
          Medicare gives you the right to choose any Medicare-certified agency.
        </li>
        <li>
          <strong>Get the physician&apos;s signed order for home health before
          discharge.</strong> This is the document the home health agency needs to
          start services. Without it, there may be a gap of several days before
          care begins.
        </li>
        <li>
          <strong>Ask what skilled services are ordered.</strong> Nursing?
          Physical therapy? Occupational therapy? This tells you what to expect
          from the agency in terms of visit frequency and duration.
        </li>
        <li>
          <strong>Ask about discharge medications.</strong> New prescriptions
          after a hospital stay are common, and medication errors in the first
          two weeks at home are a major driver of readmission. Confirm that the
          home health agency will include medication reconciliation in the nursing
          assessment.
        </li>
        <li>
          <strong>Identify the custodial care gap before you need to fill
          it.</strong> If your family member will need more help than Medicare
          covers — likely — start planning now. The time to evaluate private-pay
          or Medicaid-funded personal care is before discharge, not two weeks
          later when the crisis is acute.
        </li>
      </ol>

      <h2>How to choose an agency during a discharge crunch</h2>

      <p>
        When you have 24 hours and a list of agency names, you cannot do a
        thorough evaluation. Focus on three things:
      </p>

      <ol>
        <li>
          <strong>CMS star rating.</strong> Agencies with 4 or 5 CMS quality
          stars have meaningfully better clinical outcomes on average. In a time-
          constrained choice, this is your best single signal. WeCarely displays
          CMS stars for every agency.
        </li>
        <li>
          <strong>Availability.</strong> An excellent agency that cannot start
          services for five days is not the right choice right now. Call and ask
          when they can begin.
        </li>
        <li>
          <strong>Language capability.</strong> If your family member is not a
          fluent English speaker, confirm immediately that the agency has aides
          and nurses who speak their language. Do not accept &ldquo;we have some
          bilingual staff.&rdquo; Ask who specifically would be assigned.
        </li>
      </ol>

      <h2>After the Medicare benefit ends: what comes next</h2>

      <p>
        When the physician determines that the patient no longer needs skilled
        care — or when the patient no longer meets the homebound definition —
        Medicare home health ends. Families are then responsible for arranging
        any ongoing personal care privately.
      </p>

      <p>
        Options at this stage include:
      </p>

      <ul>
        <li>
          <strong>Private-pay home care</strong> through the same or a different
          agency, billed at standard rates ($30–$50/hour depending on location)
        </li>
        <li>
          <strong>Medicaid-funded personal care</strong> for those who qualify —
          income and asset limits apply, and wait times vary by state and
          program
        </li>
        <li>
          <strong>Adult day health programs</strong>, which provide structured
          daytime programming and are significantly less expensive than in-home
          aides
        </li>
        <li>
          <strong>Family caregiving</strong>, potentially compensated through
          Medicaid waiver programs in some states
        </li>
      </ul>

      <h2>Find a Medicare-certified agency near you</h2>

      <p>
        The following links take you directly to ranked listings of Medicare-
        certified agencies in major cities. Every agency on WeCarely has been
        filtered to include only CMS-certified providers.
      </p>

      <ul>
        <li><Link href="/houston">Home care agencies in Houston, TX</Link></li>
        <li><Link href="/dallas">Home care agencies in Dallas, TX</Link></li>
        <li><Link href="/chicago">Home care agencies in Chicago, IL</Link></li>
        <li><Link href="/miami">Home care agencies in Miami, FL</Link></li>
        <li><Link href="/los-angeles">Home care agencies in Los Angeles, CA</Link></li>
        <li><Link href="/orlando">Home care agencies in Orlando, FL</Link></li>
        <li><Link href="/san-antonio">Home care agencies in San Antonio, TX</Link></li>
        <li><Link href="/naperville">Home care agencies in Naperville, IL</Link></li>
      </ul>
    </>
  ),
};
